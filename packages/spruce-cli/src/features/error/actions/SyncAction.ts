import {
	SchemaTemplateItem,
	normalizeSchemaValues,
	SchemaValuesWithDefaults,
} from '@sprucelabs/schema'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { ErrorTemplateItem } from '@sprucelabs/spruce-templates'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import syncErrorActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/syncErrorAction.schema'
import syncSchemasActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/syncSchemasAction.schema'
import ErrorGenerator from '../../../generators/ErrorGenerator'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse, FeatureAction } from '../../features.types'

type OptionsSchema = SpruceSchemas.SpruceCli.v2020_07_22.SyncErrorActionSchema
type Options = SpruceSchemas.SpruceCli.v2020_07_22.SyncErrorAction
export default class SyncAction extends AbstractFeatureAction<OptionsSchema> {
	public name = 'sync'
	public optionsSchema = syncErrorActionSchema

	public async execute(options: Options): Promise<FeatureActionResponse> {
		const normalizedOptions = this.validateAndNormalizeOptions(options)
		const {
			errorTypesDestinationDir,
			errorClassDestinationDir,
		} = normalizedOptions

		const schemaSyncAction = this.getFeature('schema').Action(
			'sync'
		) as FeatureAction<SpruceSchemas.SpruceCli.v2020_07_22.SyncSchemasActionSchema>

		const errorSyncResults = await this.syncErrors(
			schemaSyncAction,
			normalizedOptions
		)

		if (errorSyncResults.errors) {
			return errorSyncResults
		}

		if (this.areSyncResultsEmpty(errorSyncResults)) {
			this.deleteOrphanedDirs(errorTypesDestinationDir)
			return {}
		}

		const { schemaTemplateItems } = errorSyncResults.meta as {
			schemaTemplateItems: SchemaTemplateItem[]
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
				...errorClassGeneratedFiles,
				...optionsResults,
			],
		}
	}

	private deleteOrphanedDirs(errorTypesDestinationDir: string) {
		diskUtil.deleteDir(diskUtil.resolvePath(this.cwd, errorTypesDestinationDir))
	}

	private async syncErrors(
		schemaSyncAction: FeatureAction<SpruceSchemas.SpruceCli.v2020_07_22.SyncSchemasActionSchema>,
		normalizedOptions: SchemaValuesWithDefaults<SpruceSchemas.SpruceCli.v2020_07_22.SyncErrorActionSchema>
	) {
		const resolvedErrorTypesDestinationDir = diskUtil.resolvePath(
			this.cwd,
			normalizedOptions.errorTypesDestinationDir,
			'errors.types.ts'
		)

		const syncOptions = normalizeSchemaValues(syncSchemasActionSchema, {
			...normalizedOptions,
			schemaTypesDestinationDirOrFile: resolvedErrorTypesDestinationDir,
			schemaLookupDir: normalizedOptions.errorLookupDir,
			enableVersioning: false,
			globalNamespace: 'SpruceErrors',
			fetchRemoteSchemas: false,
			generateFieldTypes: true,
			generateStandaloneTypesFile: true,
			deleteDestinationDirIfNoSchemas: true,
			fetchCoreSchemas: false,
		})

		const errorSyncResults = await schemaSyncAction.execute(syncOptions)

		return errorSyncResults
	}

	private areSyncResultsEmpty(errorSyncResults: FeatureActionResponse) {
		return (
			!errorSyncResults.meta ||
			!errorSyncResults.files ||
			errorSyncResults.files.length === 0
		)
	}

	private async generateOptionTypes(
		errorGenerator: ErrorGenerator,
		errorTemplateItems: ErrorTemplateItem[],
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
