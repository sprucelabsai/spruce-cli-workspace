import pathUtil from 'path'
import { ISchemaTemplateItem, IFieldTemplateItem } from '@sprucelabs/schema'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { IValueTypes } from '@sprucelabs/spruce-templates'
import syncSchemasActionSchema from '#spruce/schemas/local/v2020_07_22/syncSchemasAction.schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import { IGeneratedFile } from '../../../types/cli.types'
import schemaGeneratorUtil from '../../../utilities/schemaGenerator.utility'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { IFeatureActionExecuteResponse } from '../../features.types'

export default class SyncAction extends AbstractFeatureAction<
	SpruceSchemas.Local.v2020_07_22.ISyncSchemasActionSchema
> {
	public name = 'Schema sync'
	public optionsSchema = syncSchemasActionSchema

	private readonly schemaGenerator = this.Generator('schema')

	public async execute(
		options: SpruceSchemas.Local.v2020_07_22.ISyncSchemasAction
	): Promise<IFeatureActionExecuteResponse> {
		this.ui.clear()
		this.ui.startLoading(`Syncing schemas...`)

		const normalizedOptions = this.validateAndNormalizeOptions(options)

		const {
			schemaTypesDestinationDir,
			fieldTypesDestinationDir,
			schemaLookupDir,
			addonsLookupDir,
			enableVersioning,
			globalNamespace,
			fetchRemoteSchemas,
			generateFieldTypes,
		} = normalizedOptions

		const resolvedSchemaTypesDestination = diskUtil.resolvePath(
			this.cwd,
			schemaTypesDestinationDir
		)

		const resolvedSchemaTypesDestinationDir =
			pathUtil.extname(resolvedSchemaTypesDestination).length === 0
				? resolvedSchemaTypesDestination
				: pathUtil.dirname(resolvedSchemaTypesDestination)

		const resolvedFieldTypesDestination = diskUtil.resolvePath(
			this.cwd,
			fieldTypesDestinationDir ?? schemaTypesDestinationDir
		)

		const schemaStore = this.Store('schema')
		const fieldResults: IGeneratedFile[] = []

		const {
			items: fieldTemplateItems,
			errors: fieldErrors,
		} = await schemaStore.fetchFieldTemplateItems(addonsLookupDir)

		if (generateFieldTypes) {
			const results = await this.schemaGenerator.generateFieldTypes(
				resolvedFieldTypesDestination,
				{
					fieldTemplateItems,
				}
			)
			fieldResults.push(...results)
		}

		const {
			items: schemaTemplateItems,
			errors: schemaErrors,
		} = await schemaStore.fetchSchemaTemplateItems({
			localSchemaDir: schemaLookupDir,
			enableVersioning,
			fetchRemoteSchemas,
		})

		if (schemaTemplateItems.length === 0) {
			diskUtil.deleteDir(resolvedSchemaTypesDestinationDir)
			return {}
		}

		await this.deleteOrphanedDefinitions(
			resolvedSchemaTypesDestinationDir,
			schemaTemplateItems
		)

		const valueTypes = await this.generateValueTypes(
			resolvedFieldTypesDestination,
			fieldTemplateItems,
			schemaTemplateItems,
			globalNamespace ?? undefined
		)

		const typeResults = await this.schemaGenerator.generateSchemaTypes(
			resolvedSchemaTypesDestination,
			{
				fieldTemplateItems,
				schemaTemplateItems,
				valueTypes,
				globalNamespace: globalNamespace ?? undefined,
			}
		)

		this.ui.stopLoading()

		return {
			files: [...typeResults, ...fieldResults],
			errors: [...schemaErrors, ...fieldErrors],
			meta: {
				schemaTemplateItems,
				fieldTemplateItems,
			},
		}
	}

	private async generateValueTypes(
		resolvedDestination: string,
		fieldTemplateItems: IFieldTemplateItem[],
		schemaTemplateItems: ISchemaTemplateItem[],
		globalNamespace?: string
	) {
		const valueTypeResults = await this.schemaGenerator.generateValueTypes(
			resolvedDestination,
			{
				fieldTemplateItems,
				schemaTemplateItems,
				globalNamespace,
			}
		)

		const valueTypes: IValueTypes = await this.Service('import').importDefault(
			valueTypeResults[0].path
		)

		return valueTypes
	}

	private async deleteOrphanedDefinitions(
		resolvedDestination: string,
		schemaTemplateItems: ISchemaTemplateItem[]
	) {
		const definitionsToDelete = await schemaGeneratorUtil.filterSchemaFilesBySchemaIds(
			resolvedDestination,
			schemaTemplateItems.map((i) => i.id)
		)

		definitionsToDelete.forEach((def) => diskUtil.deleteFile(def))
	}
}
