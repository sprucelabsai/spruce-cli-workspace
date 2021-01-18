import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import createConversationTopicOptionsSchema from '#spruce/schemas/spruceCli/v2020_07_22/createConversationTopicOptions.schema'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'

type OptionsSchema = SpruceSchemas.SpruceCli.v2020_07_22.CreateConversationTopicOptionsSchema
type Options = SpruceSchemas.SpruceCli.v2020_07_22.CreateConversationTopicOptions
export default class CreateAction extends AbstractFeatureAction<OptionsSchema> {
	public code = 'create'
	public optionsSchema = createConversationTopicOptionsSchema

	public async execute(_options: Options): Promise<FeatureActionResponse> {
		return {}
	}
}
