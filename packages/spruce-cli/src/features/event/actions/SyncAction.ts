import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import syncEventActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/syncEventAction.schema'
import mergeUtil from '../../../utilities/merge.utility'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'
import EventFeature from '../EventFeature'

type OptionsSchema = SpruceSchemas.SpruceCli.v2020_07_22.SyncEventActionSchema
type Options = SpruceSchemas.SpruceCli.v2020_07_22.SyncEventAction

export default class SyncAction extends AbstractFeatureAction<OptionsSchema> {
	public name = 'sync'
	public optionsSchema: OptionsSchema = syncEventActionSchema

	public async execute(options: Options): Promise<FeatureActionResponse> {
		const unifiedGenerator = this.UnifiedGenerator()

		const results: FeatureActionResponse = await unifiedGenerator.generateContracts(
			options
		)

		if (results.errors) {
			return {
				errors: results.errors,
			}
		}

		const schemaSyncResults = await this.getFeature('schema')
			.Action('sync')
			.execute({})

		return mergeUtil.mergeActionResults(schemaSyncResults, results)
	}

	private UnifiedGenerator() {
		return (this.parent as EventFeature).UnifiedGenerator()
	}
}
