import pathUtil from 'path'
import { ISchemaTemplateItem, IFieldTemplateItem } from '@sprucelabs/schema'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { IValueTypes } from '@sprucelabs/spruce-templates'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import syncSchemasActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/syncSchemasAction.schema'
import SpruceError from '../../../errors/SpruceError'
import SchemaTemplateItemBuilder from '../../../templateItemBuilders/SchemaTemplateItemBuilder'
import { IGeneratedFile } from '../../../types/cli.types'
import schemaGeneratorUtil from '../../../utilities/schemaGenerator.utility'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { IFeatureActionExecuteResponse } from '../../features.types'
import SkillFeature from '../../skill/SkillFeature'

export default class SyncAction extends AbstractFeatureAction<
	SpruceSchemas.SpruceCli.v2020_07_22.ISyncSchemasActionSchema
> {
	public name = 'Schema sync'
	public optionsSchema = syncSchemasActionSchema

	private readonly schemaGenerator = this.Generator('schema')
	private readonly schemaStore = this.Store('schema')

	public async execute(
		options: SpruceSchemas.SpruceCli.v2020_07_22.ISyncSchemasAction
	): Promise<IFeatureActionExecuteResponse> {
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

		this.ui.clear()
		this.ui.startLoading(`Syncing schemas...`)

		const schemaErrors: SpruceError[] = []
		let schemaTemplateItems: ISchemaTemplateItem[] | undefined
		let typeResults: IGeneratedFile[] = []

		try {
			const templateResults = await this.generateSchemaTemplateItems({
				schemaLookupDir,
				resolvedSchemaTypesDestinationDir,
				enableVersioning,
				fetchRemoteSchemas,
			})

			schemaErrors.push(...templateResults.schemaErrors)
			schemaTemplateItems = templateResults.schemaTemplateItems
		} catch (err) {
			schemaErrors.push(err)
		}

		if (schemaTemplateItems) {
			if (schemaTemplateItems.length === 0) {
				diskUtil.deleteDir(resolvedSchemaTypesDestinationDir)
				return {}
			}

			await this.deleteOrphanedDefinitions(
				resolvedSchemaTypesDestinationDir,
				schemaTemplateItems
			)

			let valueTypes: IValueTypes | undefined

			try {
				valueTypes = await this.generateValueTypes(
					resolvedFieldTypesDestination,
					fieldTemplateItems,
					schemaTemplateItems,
					globalNamespace ?? undefined
				)
			} catch (err) {
				schemaErrors.push(err)
			}

			if (valueTypes) {
				try {
					typeResults = await this.schemaGenerator.generateSchemasAndTypes(
						resolvedSchemaTypesDestination,
						{
							fieldTemplateItems,
							schemaTemplateItems,
							valueTypes,
							globalNamespace: globalNamespace ?? undefined,
						}
					)
				} catch (err) {
					schemaErrors.push(err)
				}
			}
		}

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

		const feature = this.getFeature('skill') as SkillFeature
		const namespace = feature.getSkillNamespace()

		const {
			schemasByNamespace,
			errors: schemaErrors,
		} = await this.schemaStore.fetchSchemas({
			localSchemaDir: schemaLookupDir,
			fetchRemoteSchemas,
			enableVersioning,
			localNamespace: namespace,
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

		const action = this.getFeature('schema').Action('fields.sync')
		const results = await action.execute({
			fieldTypesDestinationDir: resolvedFieldTypesDestination,
			addonsLookupDir,
			generateFieldTypes,
		})

		return {
			generateFieldFiles: results.files ?? [],
			fieldTemplateItems: results.meta?.fieldTemplateItems ?? [],
			fieldErrors: results.errors ?? [],
		}
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
			schemaTemplateItems.map((item) => ({
				...item,
				version: item.schema.version,
			}))
		)

		definitionsToDelete.forEach((def) => diskUtil.deleteFile(def))
	}
}
