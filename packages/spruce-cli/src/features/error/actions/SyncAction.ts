import {
	buildSchema,
	SchemaValues,
	ISchemaTemplateItem,
	SchemaValuesWithDefaults,
} from '@sprucelabs/schema'
import { IErrorTemplateItem } from '@sprucelabs/spruce-templates'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import AbstractFeatureAction from '../../../featureActions/AbstractFeatureAction'
import ErrorGenerator from '../../../generators/ErrorGenerator'
import diskUtil from '../../../utilities/disk.utility'
import namesUtil from '../../../utilities/names.utility'
import {
	IFeatureActionExecuteResponse,
	IFeatureAction,
} from '../../features.types'
import {
	syncSchemasActionOptionsDefinition,
	ISyncSchemasActionDefinition,
} from '../../schema/actions/SyncAction'

export const syncErrorsActionOptionsDefinition = buildSchema({
	id: 'errorSync',
	name: 'Sync error',
	fields: {
		addonsLookupDir: syncSchemasActionOptionsDefinition.fields.addonsLookupDir,
		errorClassDestinationDir: {
			type: FieldType.Text,
			label: 'Error class destination',
			isRequired: true,
			hint: "Where I'll save your new Error class file?",
			defaultValue: 'src/errors',
		},
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
	public optionsSchema = syncErrorsActionOptionsDefinition

	public async execute(
		options: SchemaValues<ISyncErrorsActionDefinition>
	): Promise<IFeatureActionExecuteResponse> {
		const normalizedOptions = this.validateAndNormalizeOptions(options)
		const {
			errorTypesDestinationDir,
			errorClassDestinationDir,
		} = normalizedOptions

		const schemaSyncAction = this.getFeature('schema').Action(
			'sync'
		) as IFeatureAction<ISyncSchemasActionDefinition>

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
		schemaSyncAction: IFeatureAction<ISyncSchemasActionDefinition>,
		normalizedOptions: SchemaValuesWithDefaults<ISyncErrorsActionDefinition>
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
