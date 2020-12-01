import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import eventListenActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/listenEventAction.schema'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'

export default class SyncAction extends AbstractFeatureAction<SpruceSchemas.SpruceCli.v2020_07_22.ListenEventActionSchema> {
	public name = 'sync'
	public optionsSchema: SpruceSchemas.SpruceCli.v2020_07_22.ListenEventActionSchema = eventListenActionSchema

	public async execute(
		options: SpruceSchemas.SpruceCli.v2020_07_22.ListenEventAction
	): Promise<FeatureActionResponse> {
		const normalizedOptions = this.validateAndNormalizeOptions(options)

		return {}
	}
}
