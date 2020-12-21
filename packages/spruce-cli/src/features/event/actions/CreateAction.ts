import { buildSchema, SchemaValues } from '@sprucelabs/schema'
import { diskUtil, namesUtil } from '@sprucelabs/spruce-skill-utils'
import SpruceError from '../../../errors/SpruceError'
import namedTemplateItemBuilder from '../../../schemas/v2020_07_22/namedTemplateItem.builder'
import { GeneratedFile } from '../../../types/cli.types'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'

const optionsSchema = buildSchema({
	id: 'createEventAction',
	fields: {
		nameReadable: {
			...namedTemplateItemBuilder.fields.nameReadable,
			isRequired: true,
		},
		nameKebab: {
			...namedTemplateItemBuilder.fields.nameKebab,
			label: 'Event name',
			isRequired: true,
		},
		nameCamel: {
			...namedTemplateItemBuilder.fields.namePascal,
			isRequired: true,
		},
	},
})

type OptionsSchema = typeof optionsSchema

export default class CreateAction extends AbstractFeatureAction<OptionsSchema> {
	public name = 'create'
	public optionsSchema: OptionsSchema = optionsSchema

	public async execute(
		options: SchemaValues<OptionsSchema>
	): Promise<FeatureActionResponse> {
		const { nameKebab, nameCamel } = this.validateAndNormalizeOptions(options)

		const skill = await this.Store('skill').loadCurrentSkill()

		if (!skill.id || !skill.slug) {
			return {
				errors: [new SpruceError({ code: 'SKILL_NOT_REGISTERED' })],
			}
		}

		try {
			let response: FeatureActionResponse = {}

			const files: ({
				templateMethod: 'eventEmitPayload' | 'eventResponsePayload'
			} & Omit<GeneratedFile, 'path'>)[] = [
				{
					templateMethod: 'eventEmitPayload',
					name: 'emitPayload.builder.ts',
					action: 'generated',
					description:
						'The payload that will be sent when you emit this event.',
				},
				{
					templateMethod: 'eventResponsePayload',
					name: 'responsePayload.builder.ts',
					action: 'generated',
					description:
						'The payload that every listener will need to respond with. Delete this file for events that are fire and forget.',
				},
			]

			response.files = []

			for (const file of files) {
				const destination = diskUtil.resolvePath(
					this.cwd,
					'src',
					'events',
					namesUtil.toPascal(skill.slug),
					nameKebab,
					file.name
				)

				const contents = this.templates[file.templateMethod]({
					nameCamel,
				})

				diskUtil.writeFile(destination, contents)

				response.files.push({
					...file,
					path: destination,
				})
			}

			return response
		} catch (err) {
			return {
				errors: [err],
			}
		}
	}
}
