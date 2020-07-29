import {
	ISchemaTemplateItem,
	SchemaValuesWithDefaults,
} from '@sprucelabs/schema'
import { IErrorTemplateItem } from '@sprucelabs/spruce-templates'
import errorSyncActionSchema from '#spruce/schemas/local/v2020_07_22/errorSyncAction.schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import AbstractFeatureAction from '../../../featureActions/AbstractFeatureAction'
import ErrorGenerator from '../../../generators/ErrorGenerator'
import diskUtil from '../../../utilities/disk.utility'
import namesUtil from '../../../utilities/names.utility'
import {
	IFeatureActionExecuteResponse,
	IFeatureAction,
} from '../../features.types'

export default class SyncAction extends AbstractFeatureAction<
	SpruceSchemas.Local.v2020_07_22.IErrorSyncActionSchema
> {
	public name = 'sync'
	public optionsSchema = errorSyncActionSchema

	public async execute(
		options: SpruceSchemas.Local.v2020_07_22.IErrorSyncAction
	): Promise<IFeatureActionExecuteResponse> {
		const normalizedOptions = this.validateAndNormalizeOptions(options)
		const {
			errorTypesDestinationDir,
			errorClassDestinationDir,
		} = normalizedOptions

		const schemaSyncAction = this.getFeature('schema').Action(
			'sync'
		) as IFeatureAction<
			SpruceSchemas.Local.v2020_07_22.ISyncSchemasActionSchema
		>

		const schemaSyncResults = await schemaSyncAction.execute({})
		const errorSyncResults = await this.syncErrors(
			schemaSyncAction,
			normalizedOptions
		)

		if (this.areSyncResultsEmpty(errorSyncResults)) {
			this.deleteOrphanedDirs(errorTypesDestinationDir)
			return {}
		}

		const { schemaTemplateItems } = errorSyncResults.meta as {
			schemaTemplateItems: ISchemaTemplateItem[]
		}

		const errorTemplateItems = schemaTemplateItems.map((item) => ({
			...item,
			code: namesUtil.toConst(item.namePascal),
		}))
		const errorGenerator = new ErrorGenerator(this.templates)

		const optionsResults = await this.generateOptionTypes(
			errorGenerator,
			errorTemplateItems,
			errorTypesDestinationDir
		)

		const errorClassGeneratedFiles = await errorGenerator.generateOrAppendErrorsToClass(
			diskUtil.resolvePath(this.cwd, errorClassDestinationDir),
			errorTemplateItems
		)

		return {
			files: [
				...(errorSyncResults.files ?? []),
				...(schemaSyncResults.files ?? []),
				...errorClassGeneratedFiles,
				...optionsResults,
			],
		}
	}

	private deleteOrphanedDirs(errorTypesDestinationDir: string) {
		diskUtil.deleteDir(diskUtil.resolvePath(this.cwd, errorTypesDestinationDir))
	}

	private async syncErrors(
		schemaSyncAction: IFeatureAction<
			SpruceSchemas.Local.v2020_07_22.ISyncSchemasActionSchema
		>,
		normalizedOptions: SchemaValuesWithDefaults<
			SpruceSchemas.Local.v2020_07_22.IErrorSyncActionSchema
		>
	) {
		const resolvedErrorTypesDestinationDir = diskUtil.resolvePath(
			this.cwd,
			normalizedOptions.errorTypesDestinationDir,
			'errors.types.ts'
		)

		const errorSyncResults = await schemaSyncAction.execute({
			...normalizedOptions,
			schemaTypesDestinationDir: resolvedErrorTypesDestinationDir,
			schemaLookupDir: normalizedOptions.errorLookupDir,
			enableVersioning: false,
			globalNamespace: 'SpruceErrors',
			fetchRemoteSchemas: false,
			generateFieldTypes: false,
		})
		return errorSyncResults
	}

	private areSyncResultsEmpty(errorSyncResults: IFeatureActionExecuteResponse) {
		return (
			!errorSyncResults.meta ||
			!errorSyncResults.files ||
			errorSyncResults.files.length === 0
		)
	}

	private async generateOptionTypes(
		errorGenerator: ErrorGenerator,
		errorTemplateItems: IErrorTemplateItem[],
		errorTypesDestinationDir: string
	) {
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
