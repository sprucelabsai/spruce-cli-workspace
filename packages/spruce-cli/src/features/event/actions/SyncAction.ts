import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import syncEventActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/syncEventOptions.schema'
import actionUtil from '../../../utilities/action.utility'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import FeatureCommandExecuter from '../../FeatureCommandExecuter'
import { FeatureActionResponse } from '../../features.types'
import EventFeature from '../EventFeature'

type OptionsSchema = SpruceSchemas.SpruceCli.v2020_07_22.SyncEventOptionsSchema
type Options = SpruceSchemas.SpruceCli.v2020_07_22.SyncEventOptions

export default class SyncAction extends AbstractFeatureAction<OptionsSchema> {
	public code = 'sync'
	public commandAliases = ['sync.events']
	public optionsSchema: OptionsSchema = syncEventActionSchema
	public invocationMessage = 'Syncing event contracts... 🜒'

	public async execute(options: Options): Promise<FeatureActionResponse> {
		const writer = this.ContractWriter()

		const results: FeatureActionResponse = await writer.fetchAndWriteContracts(
			options
		)

		if (results.errors) {
			return {
				errors: results.errors,
			}
		}

		const schemaSyncResults = await FeatureCommandExecuter.Executer(
			'schema',
			'sync'
		).execute({})

		return actionUtil.mergeActionResults(schemaSyncResults, results)
	}

	private ContractWriter() {
		return (this.parent as EventFeature).EventContractBuilder()
	}
}
