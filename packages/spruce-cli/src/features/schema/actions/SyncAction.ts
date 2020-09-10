import pathUtil from 'path'
import { ISchemaTemplateItem, IFieldTemplateItem } from '@sprucelabs/schema'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { IValueTypes } from '@sprucelabs/spruce-templates'
import syncSchemasActionSchema from '#spruce/schemas/local/v2020_07_22/syncSchemasAction.schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import FieldTemplateItemBuilder from '../../../templateItemBuilders/FieldTemplateItemBuilder'
import SchemaTemplateItemBuilder from '../../../templateItemBuilders/SchemaTemplateItemBuilder'
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
	private readonly schemaStore = this.Store('schema')

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

		const {
			resolvedFieldTypesDestination,
			resolvedSchemaTypesDestinationDir,
			resolvedSchemaTypesDestination,
		} = this.resolvePaths(schemaTypesDestinationDir, fieldTypesDestinationDir)

		const {
			fieldTemplateItems,
			fieldErrors,
			generateFieldFiles,
		} = await this.generateFieldTemplateItems({
			addonsLookupDir,
			generateFieldTypes,
			resolvedFieldTypesDestination,
		})

		const {
			schemaTemplateItems,
			schemaErrors,
		} = await this.generateSchemaTemplateItems({
			schemaLookupDir,
			resolvedSchemaTypesDestinationDir,
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

		const typeResults = await this.schemaGenerator.generateSchemasAndTypes(
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
			files: [...typeResults, ...generateFieldFiles],
			errors: [...schemaErrors, ...fieldErrors],
			meta: {
				schemaTemplateItems,
				fieldTemplateItems,
			},
		}
	}
	public async generateSchemaTemplateItems(options: {
		schemaLookupDir: string
		resolvedSchemaTypesDestinationDir: string
		enableVersioning: boolean
		fetchRemoteSchemas: boolean
	}) {
		const {
			schemaLookupDir,
			resolvedSchemaTypesDestinationDir,
			enableVersioning,
			fetchRemoteSchemas,
		} = options

		const {
			schemasByNamespace,
			errors: schemaErrors,
		} = await this.schemaStore.fetchSchemas({
			localSchemaDir: schemaLookupDir,
			fetchRemoteSchemas,
			enableVersioning,
		})

		const hashSpruceDestination = resolvedSchemaTypesDestinationDir.replace(
			diskUtil.resolveHashSprucePath(this.cwd),
			'#spruce'
		)

		const schemaTemplateItemBuilder = new SchemaTemplateItemBuilder()
		const schemaTemplateItems: ISchemaTemplateItem[] = schemaTemplateItemBuilder.generateTemplateItems(
			schemasByNamespace,
			hashSpruceDestination
		)

		return { schemaTemplateItems, schemaErrors }
	}

	private async generateFieldTemplateItems(options: {
		addonsLookupDir: string
		generateFieldTypes: boolean
		resolvedFieldTypesDestination: string
	}) {
		const {
			addonsLookupDir,
			generateFieldTypes,
			resolvedFieldTypesDestination,
		} = options

		const generateFieldFiles: IGeneratedFile[] = []

		const { fields, errors: fieldErrors } = await this.schemaStore.fetchFields({
			localAddonsDir: addonsLookupDir,
		})

		const fieldTemplateItemBuilder = new FieldTemplateItemBuilder()
		const fieldTemplateItems = fieldTemplateItemBuilder.generateTemplateItems(
			fields
		)

		if (generateFieldTypes) {
			const results = await this.schemaGenerator.generateFieldTypes(
				resolvedFieldTypesDestination,
				{
					fieldTemplateItems,
				}
			)
			generateFieldFiles.push(...results)
		}

		return { generateFieldFiles, fieldTemplateItems, fieldErrors }
	}

	private resolvePaths(
		schemaTypesDestinationDir: string,
		fieldTypesDestinationDir: string
	) {
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
			fieldTypesDestinationDir ?? resolvedSchemaTypesDestinationDir
		)
		return {
			resolvedFieldTypesDestination,
			resolvedSchemaTypesDestinationDir,
			resolvedSchemaTypesDestination,
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
