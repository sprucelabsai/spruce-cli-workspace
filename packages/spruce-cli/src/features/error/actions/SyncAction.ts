import {
	buildSchemaDefinition,
	SchemaDefinitionValues,
} from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import AbstractFeatureAction from '../../../featureActions/AbstractFeatureAction'
import ErrorGenerator from '../../../generators/ErrorGenerator'
import diskUtil from '../../../utilities/disk.utility'
import {
	IFeatureActionExecuteResponse,
	IFeatureAction,
} from '../../features.types'
import {
	syncSchemasActionOptionsDefinition,
	ISyncSchemasActionDefinition,
} from '../../schema/actions/SyncAction'

export const syncErrorsActionOptionsDefinition = buildSchemaDefinition({
	id: 'errorSync',
	name: 'Sync error',
	fields: {
		addonsLookupDir: syncSchemasActionOptionsDefinition.fields.addonsLookupDir,
		errorLookupDir: {
			type: FieldType.Text,
			hint: 'Where I should look for your error builders?',
			defaultValue: 'src/errors',
		},
		errorTypesDestinationDir: {
			type: FieldType.Text,
			label: 'Types destination dir',
			hint: 'This is where error options and type information will be written',
			defaultValue: '#spruce/errors',
		},
	},
})

export type ISyncErrorsActionDefinition = typeof syncErrorsActionOptionsDefinition

export default class SyncAction extends AbstractFeatureAction<
	ISyncErrorsActionDefinition
> {
	public name = 'sync'
	public optionsDefinition = syncErrorsActionOptionsDefinition

	public async execute(
		options: SchemaDefinitionValues<ISyncErrorsActionDefinition>
	): Promise<IFeatureActionExecuteResponse> {
		const normalizedOptions = this.validateAndNormalizeOptions(options)
		const {
			errorTypesDestinationDir,
			errorLookupDir,
			addonsLookupDir,
		} = normalizedOptions

		const schemaSyncAction = this.getFeature('schema').Action(
			'sync'
		) as IFeatureAction<ISyncSchemasActionDefinition>

		const schemaSyncResults = await schemaSyncAction.execute({})

		const resolvedErrorTypesDestinationDir = diskUtil.resolvePath(
			this.cwd,
			errorTypesDestinationDir,
			'errors.types.ts'
		)

		const errorSyncResults = await schemaSyncAction.execute({
			...normalizedOptions,
			schemaTypesDestinationDir: resolvedErrorTypesDestinationDir,
			schemaLookupDir: errorLookupDir,
			enableVersioning: false,
			namespacePrefix: 'SpruceErrors',
			addonsLookupDir,
			fetchRemoteSchemas: false,
			generateFieldTypes: false,
		})

		const optionsResults = await this.generateOptionTypes(
			errorLookupDir,
			errorTypesDestinationDir
		)

		return {
			files: [
				...(errorSyncResults.files ?? []),
				...(schemaSyncResults.files ?? []),
				...optionsResults,
			],
		}
	}

	private async generateOptionTypes(
		errorLookupDir: string,
		errorTypesDestinationDir: string
	) {
		const errorGenerator = new ErrorGenerator(this.templates)
		const errorStore = this.Store('error')

		const storeResults = await errorStore.fetchErrorTemplateItems(
			errorLookupDir
		)

		const errorTemplateItems = storeResults.items

		if (errorTemplateItems.length === 0) {
			return []
		}

		const resolvedTypesDestination = diskUtil.resolvePath(
			this.cwd,
			errorTypesDestinationDir
		)

		const optionsResults = await errorGenerator.generateOptionsTypesFile(
			resolvedTypesDestination,
			errorTemplateItems
		)

		return optionsResults
	}
}
