import { buildSchema, SchemaValues } from '@sprucelabs/schema'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import eventResponseUtil from '../../event/utilities/eventResponse.utility'
import { FeatureActionResponse } from '../../features.types'
import SkillFeature from '../SkillFeature'

const registerSchema = buildSchema({ id: 'registerSkillAction', fields: {} })

type OptionsSchema = typeof registerSchema
type Options = SchemaValues<OptionsSchema>

export default class RegisterAction extends AbstractFeatureAction<OptionsSchema> {
	public name = 'register'
	public optionsSchema: OptionsSchema = registerSchema

	public async execute(_options: Options): Promise<FeatureActionResponse> {
		const client = await this.connectToApi()

		const skillFeature = this.parent as SkillFeature
		const name = skillFeature.getSkillName()
		const description = skillFeature.getSkillDescription()

		const results = await client.emit('register-skill', {
			payload: {
				name,
				description,
			},
		})

		try {
			eventResponseUtil.getFirstResponseOrThrow(results)

			return {}
		} catch (err) {
			return {
				errors: [err],
			}
		}
	}
}
