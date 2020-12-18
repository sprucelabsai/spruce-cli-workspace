import { buildSchema, SchemaValues } from '@sprucelabs/schema'
import { eventResponseUtil } from '@sprucelabs/spruce-event-utils'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'

const optionsSchema = buildSchema({
	id: 'registerSkillAction',
	fields: {
		nameReadable: {
			type: 'text',
			label: `What is your skills name?`,
			isRequired: true,
		},
		nameKebab: {
			type: 'text',
			label: 'Slug',
			isRequired: true,
		},
		description: {
			type: 'text',
			label: 'Describe your skill',
		},
	},
})

type OptionsSchema = typeof optionsSchema
type Options = SchemaValues<OptionsSchema>

export default class RegisterAction extends AbstractFeatureAction<OptionsSchema> {
	public name = 'register'
	public optionsSchema: OptionsSchema = optionsSchema

	public async execute(options: Options): Promise<FeatureActionResponse> {
		const {
			nameReadable,
			nameKebab,
			description,
		} = this.validateAndNormalizeOptions(options)

		const client = await this.connectToApi()
		const results = await client.emit('register-skill', {
			payload: {
				name: nameReadable,
				slug: nameKebab,
				description,
			},
		})

		try {
			const { skill } = eventResponseUtil.getFirstResponseOrThrow(results)

			const summaryLines = [
				`Name: ${skill.name}`,
				`ID: ${skill.id}`,
				`API Key: ${skill.apiKey}`,
			]

			return {
				summaryLines,
				meta: {
					skill,
				},
			}
		} catch (err) {
			return {
				errors: [err],
			}
		}
	}
}
