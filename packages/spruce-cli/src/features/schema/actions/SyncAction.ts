import pathUtil from 'path'
import { SchemaTemplateItem, FieldTemplateItem } from '@sprucelabs/schema'
import { CORE_NAMESPACE, diskUtil } from '@sprucelabs/spruce-skill-utils'
import { ValueTypes } from '@sprucelabs/spruce-templates'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import syncSchemasActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/syncSchemasAction.schema'
import SpruceError from '../../../errors/SpruceError'
import SchemaTemplateItemBuilder from '../../../templateItemBuilders/SchemaTemplateItemBuilder'
import { GeneratedFile } from '../../../types/cli.types'
import mergeUtil from '../../../utilities/merge.utility'
import schemaGeneratorUtil from '../../../utilities/schemaGenerator.utility'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'
import SkillFeature from '../../skill/SkillFeature'
import ValueTypeBuilder from '../ValueTypeBuilder'

type OptionsSchema = SpruceSchemas.SpruceCli.v2020_07_22.SyncSchemasActionSchema
type Options = SpruceSchemas.SpruceCli.v2020_07_22.SyncSchemasAction
export default class SyncAction extends AbstractFeatureAction<OptionsSchema> {
	public name = 'Schema sync'
	public optionsSchema = syncSchemasActionSchema

	private readonly schemaGenerator = this.Generator('schema')
	private readonly schemaStore = this.Store('schema')

	public async execute(options: Options): Promise<FeatureActionResponse> {
		const normalizedOptions = this.validateAndNormalizeOptions(options)

		let {
			schemaTypesDestinationDirOrFile,
			fieldTypesDestinationDir,
			schemaLookupDir,
			addonsLookupDir,
			enableVersioning,
			globalNamespace,
			fetchRemoteSchemas,
			generateCoreSchemaTypes,
			fetchLocalSchemas,
			generateFieldTypes,
			generateStandaloneTypesFile,
			deleteDestinationDirIfNoSchemas,
			fetchCoreSchemas,
			registerBuiltSchemas,
		} = normalizedOptions

		const feature = this.getFeature('skill') as SkillFeature
		let localNamespace = feature.getSkillNamespace()

		let shouldImportCoreSchemas = true

		if (generateCoreSchemaTypes) {
			fetchRemoteSchemas = false
			fetchLocalSchemas = true
			fetchCoreSchemas = false
			registerBuiltSchemas = true
			generateStandaloneTypesFile = true
			shouldImportCoreSchemas = false
			localNamespace = CORE_NAMESPACE
		}

		const shouldSyncRemoteSchemasFirst =
			fetchLocalSchemas &&
			fetchCoreSchemas &&
			!diskUtil.doesDirExist(
				diskUtil.resolveHashSprucePath(this.cwd, 'schemas', CORE_NAMESPACE)
			)

		let coreSyncResults: FeatureActionResponse | undefined

		if (shouldSyncRemoteSchemasFirst) {
			coreSyncResults = await this.execute({
				...normalizedOptions,
				fetchLocalSchemas: false,
			})
		}

		const {
			resolvedFieldTypesDestination,
			resolvedSchemaTypesDestinationDirOrFile,
			resolvedSchemaTypesDestination,
		} = this.resolvePaths(
			generateStandaloneTypesFile,
			schemaTypesDestinationDirOrFile,
			fieldTypesDestinationDir
		)

		const {
			fieldTemplateItems,
			fieldErrors,
			generateFieldFiles,
		} = await this.generateFieldTemplateItems({
			addonsLookupDir,
			shouldGenerateFieldTypes: generateFieldTypes,
			resolvedFieldTypesDestination,
		})

		this.ui.startLoading(`Syncing schemas...`)

		const schemaErrors: SpruceError[] = []
		let schemaTemplateItems: SchemaTemplateItem[] | undefined
		let typeResults: GeneratedFile[] = []

		try {
			const templateResults = await this.generateSchemaTemplateItems({
				schemaLookupDir,
				fetchLocalSchemas,
				resolvedSchemaTypesDestinationDirOrFile,
				enableVersioning,
				fetchRemoteSchemas,
				fetchCoreSchemas,
				localNamespace,
			})

			schemaErrors.push(...templateResults.schemaErrors)
			schemaTemplateItems = templateResults.schemaTemplateItems
		} catch (err) {
			schemaErrors.push(err)
		}

		if (schemaTemplateItems) {
			if (deleteDestinationDirIfNoSchemas && schemaTemplateItems.length === 0) {
				diskUtil.deleteDir(resolvedSchemaTypesDestinationDirOrFile)
				return {}
			}

			await this.deleteOrphanedSchemas(
				resolvedSchemaTypesDestinationDirOrFile,
				schemaTemplateItems
			)

			let valueTypes: ValueTypes | undefined

			try {
				valueTypes = await this.generateValueTypes({
					resolvedDestination: resolvedFieldTypesDestination,
					fieldTemplateItems,
					schemaTemplateItems,
					globalNamespace: globalNamespace ?? undefined,
				})
			} catch (err) {
				schemaErrors.push(err)
			}

			if (valueTypes) {
				try {
					typeResults = await this.schemaGenerator.generateSchemasAndTypes(
						resolvedSchemaTypesDestination,
						{
							registerBuiltSchemas,
							fieldTemplateItems,
							schemaTemplateItems,
							shouldImportCoreSchemas,
							valueTypes,
							globalNamespace: globalNamespace ?? undefined,
							typesTemplate: generateStandaloneTypesFile
								? 'schemas/core.schemas.types.ts.hbs'
								: undefined,
						}
					)
				} catch (err) {
					schemaErrors.push(err)
				}
			}
		}

		this.ui.stopLoading()

		const errors = [...schemaErrors, ...fieldErrors]

		return mergeUtil.mergeActionResults(coreSyncResults || {}, {
			files: [...typeResults, ...generateFieldFiles],
			errors: errors.length > 0 ? errors : undefined,
			meta: {
				schemaTemplateItems,
				fieldTemplateItems,
			},
		})
	}

	private async generateSchemaTemplateItems(options: {
		schemaLookupDir: string | undefined
		localNamespace: string
		resolvedSchemaTypesDestinationDirOrFile: string
		fetchLocalSchemas: boolean
		enableVersioning: boolean
		fetchRemoteSchemas: boolean
		fetchCoreSchemas: boolean
	}) {
		const {
			schemaLookupDir,
			resolvedSchemaTypesDestinationDirOrFile,
			enableVersioning,
			fetchRemoteSchemas,
			fetchCoreSchemas,
			fetchLocalSchemas,
			localNamespace,
		} = options

		const {
			schemasByNamespace,
			errors: schemaErrors,
		} = await this.schemaStore.fetchSchemas({
			localSchemaLookupDir: schemaLookupDir,
			fetchLocalSchemas,
			fetchRemoteSchemas,
			enableVersioning,
			localNamespace,
			fetchCoreSchemas,
		})

		const hashSpruceDestination = resolvedSchemaTypesDestinationDirOrFile.replace(
			diskUtil.resolveHashSprucePath(this.cwd),
			'#spruce'
		)

		const schemaTemplateItemBuilder = new SchemaTemplateItemBuilder(
			localNamespace
		)

		const schemaTemplateItems: SchemaTemplateItem[] = schemaTemplateItemBuilder.buildTemplateItems(
			schemasByNamespace,
			hashSpruceDestination
		)

		return { schemaTemplateItems, schemaErrors }
	}

	private async generateFieldTemplateItems(options: {
		addonsLookupDir: string
		shouldGenerateFieldTypes: boolean
		resolvedFieldTypesDestination: string
	}) {
		const {
			addonsLookupDir,
			shouldGenerateFieldTypes: generateFieldTypes,
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
		generateStandaloneTypesFile: boolean,
		schemaTypesDestinationDirOrFile: string,
		fieldTypesDestinationDir: string
	) {
		const resolvedSchemaTypesDestination = diskUtil.resolvePath(
			this.cwd,
			generateStandaloneTypesFile &&
				diskUtil.isDirPath(schemaTypesDestinationDirOrFile)
				? diskUtil.resolvePath(
						this.cwd,
						schemaTypesDestinationDirOrFile,
						'core.schemas.types.ts'
				  )
				: schemaTypesDestinationDirOrFile
		)

		const resolvedSchemaTypesDestinationDirOrFile = diskUtil.isDirPath(
			resolvedSchemaTypesDestination
		)
			? resolvedSchemaTypesDestination
			: pathUtil.dirname(resolvedSchemaTypesDestination)

		const resolvedFieldTypesDestination = diskUtil.resolvePath(
			this.cwd,
			fieldTypesDestinationDir ?? resolvedSchemaTypesDestinationDirOrFile
		)

		return {
			resolvedFieldTypesDestination,
			resolvedSchemaTypesDestinationDirOrFile,
			resolvedSchemaTypesDestination,
		}
	}

	private async generateValueTypes(options: {
		resolvedDestination: string
		fieldTemplateItems: FieldTemplateItem[]
		schemaTemplateItems: SchemaTemplateItem[]
		globalNamespace?: string
	}) {
		const builder = new ValueTypeBuilder(
			this.schemaGenerator,
			this.Service('import')
		)

		return builder.generateValueTypes(options)
	}

	private async deleteOrphanedSchemas(
		resolvedDestination: string,
		schemaTemplateItems: SchemaTemplateItem[]
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
