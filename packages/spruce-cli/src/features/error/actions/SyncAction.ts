import {
	ISchemaTemplateItem,
	normalizeSchemaValues,
	SchemaValuesWithDefaults,
} from '@sprucelabs/schema'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { IErrorTemplateItem } from '@sprucelabs/spruce-templates'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import syncErrorActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/syncErrorAction.schema'
import syncSchemasActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/syncSchemasAction.schema'
import ErrorGenerator from '../../../generators/ErrorGenerator'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import {
	IFeatureActionExecuteResponse,
	IFeatureAction,
} from '../../features.types'

export default class SyncAction extends AbstractFeatureAction<
	SpruceSchemas.SpruceCli.v2020_07_22.ISyncErrorActionSchema
> {
	public name = 'sync'
	public optionsSchema = syncErrorActionSchema

	public async execute(
		options: SpruceSchemas.SpruceCli.v2020_07_22.ISyncErrorAction
	): Promise<IFeatureActionExecuteResponse> {
		const normalizedOptions = this.validateAndNormalizeOptions(options)
		const {
			errorTypesDestinationDir,
			errorClassDestinationDir,
		} = normalizedOptions

		const schemaSyncAction = this.getFeature('schema').Action(
			'sync'
		) as IFeatureAction<
			SpruceSchemas.SpruceCli.v2020_07_22.ISyncSchemasActionSchema
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
		const errorGenerator = this.Generator('error')

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
			SpruceSchemas.SpruceCli.v2020_07_22.ISyncSchemasActionSchema
		>,
		normalizedOptions: SchemaValuesWithDefaults<
			SpruceSchemas.SpruceCli.v2020_07_22.ISyncErrorActionSchema
		>
	) {
		const resolvedErrorTypesDestinationDir = diskUtil.resolvePath(
			this.cwd,
			normalizedOptions.errorTypesDestinationDir,
			'errors.types.ts'
		)

		const syncOptions = normalizeSchemaValues(syncSchemasActionSchema, {
			...normalizedOptions,
			schemaTypesDestinationDir: resolvedErrorTypesDestinationDir,
			schemaLookupDir: normalizedOptions.errorLookupDir,
			enableVersioning: false,
			globalNamespace: 'SpruceErrors',
			fetchRemoteSchemas: false,
			generateFieldTypes: false,
			generateStandaloneTypesFile: true,
		})

		const errorSyncResults = await schemaSyncAction.execute(syncOptions)

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

		const topLevelItems = errorTemplateItems.filter((i) => !i.isNested)

		const optionsResults = await errorGenerator.generateOptionsTypesFile(
			resolvedTypesDestination,
			topLevelItems
		)

		return optionsResults
	}
}
