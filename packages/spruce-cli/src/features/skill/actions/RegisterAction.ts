import { buildSchema, SchemaValues } from '@sprucelabs/schema'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'

const registerSchema = buildSchema({ id: 'registerSkill', fields: {} })

type OptionsSchema = typeof registerSchema
type Options = SchemaValues<OptionsSchema>

export default class RegisterAction extends AbstractFeatureAction<OptionsSchema> {
	public name = 'register'
	public optionsSchema: OptionsSchema = registerSchema

	public async execute(_options: Options): Promise<FeatureActionResponse> {
		return {}
	}
}
