import pathUtil from 'path'
import { SchemaTemplateItem, FieldTemplateItem } from '@sprucelabs/schema'
import { CORE_NAMESPACE, diskUtil } from '@sprucelabs/spruce-skill-utils'
import { ValueTypes } from '@sprucelabs/spruce-templates'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import syncSchemasActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/syncSchemasOptions.schema'
import SpruceError from '../../../errors/SpruceError'
import SchemaTemplateItemBuilder from '../../../templateItemBuilders/SchemaTemplateItemBuilder'
import { GeneratedFile } from '../../../types/cli.types'
import actionUtil from '../../../utilities/action.utility'
import AbstractAction from '../../AbstractAction'
import { FeatureActionResponse } from '../../features.types'
import schemaGeneratorUtil from '../utilities/schemaGenerator.utility'
import ValueTypeBuilder from '../ValueTypeBuilder'

type OptionsSchema =
	SpruceSchemas.SpruceCli.v2020_07_22.SyncSchemasOptionsSchema
type Options = SpruceSchemas.SpruceCli.v2020_07_22.SyncSchemasOptions
export default class SyncAction extends AbstractAction<OptionsSchema> {
	public optionsSchema = syncSchemasActionSchema
	public commandAliases = ['sync.schemas']
	public invocationMessage =
		'Syncing schemas and generating `SpruceSchemas` type namespace... 📃'

	private readonly schemaWriter = this.Writer('schema')
	private readonly schemaStore = this.Store('schema')

	public async execute(options: Options): Promise<FeatureActionResponse> {
		const normalizedOptions = this.validateAndNormalizeOptions(options)
		const isInCoreSchemasModule =
			this.Service('pkg').get('name') === '@sprucelabs/spruce-core-schemas'

		let {
			schemaTypesDestinationDirOrFile,
			fieldTypesDestinationDir,
			schemaLookupDir,
			addonsLookupDir,
			enableVersioning,
			globalSchemaNamespace,
			fetchRemoteSchemas,
			generateCoreSchemaTypes = isInCoreSchemasModule,
			fetchLocalSchemas,
			generateFieldTypes,
			generateStandaloneTypesFile,
			deleteDestinationDirIfNoSchemas,
			fetchCoreSchemas,
			registerBuiltSchemas,
			syncingMessage,
			deleteOrphanedSchemas,
		} = normalizedOptions

		this.ui.startLoading('Loading details about your skill... 🧐')

		let localNamespace = await this.Store('skill').loadCurrentSkillsNamespace()
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
			this.ui.startLoading('Syncing core schemas first...')
			coreSyncResults = await this.execute({
				...normalizedOptions,
				deleteOrphanedSchemas: false,
				fetchLocalSchemas: false,
				fetchRemoteSchemas: false,
			})
			this.ui.startLoading('Done syncing core schemas...')
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

		this.ui.startLoading('Generating field types...')

		const { fieldTemplateItems, fieldErrors, generateFieldFiles } =
			await this.generateFieldTemplateItems({
				addonsLookupDir,
				shouldGenerateFieldTypes: generateFieldTypes,
				resolvedFieldTypesDestination,
			})

		this.ui.startLoading(syncingMessage)

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

		if (schemaErrors.length === 0 && schemaTemplateItems) {
			if (deleteDestinationDirIfNoSchemas && schemaTemplateItems.length === 0) {
				diskUtil.deleteDir(resolvedSchemaTypesDestinationDirOrFile)
				return {}
			}

			if (deleteOrphanedSchemas) {
				this.ui.startLoading('Identifying orphaned schemas...')

				await this.deleteOrphanedSchemas(
					resolvedSchemaTypesDestinationDirOrFile,
					schemaTemplateItems
				)
			}

			let valueTypes: ValueTypes | undefined

			try {
				valueTypes = await this.generateValueTypes({
					resolvedDestination: resolvedFieldTypesDestination,
					fieldTemplateItems,
					schemaTemplateItems,
					globalSchemaNamespace: globalSchemaNamespace ?? undefined,
				})
			} catch (err) {
				schemaErrors.push(err)
			}

			if (valueTypes) {
				try {
					this.ui.startLoading('Determining what changed... ⚡️')

					typeResults = await this.schemaWriter.writeSchemasAndTypes(
						resolvedSchemaTypesDestination,
						{
							registerBuiltSchemas,
							fieldTemplateItems,
							schemaTemplateItems,
							shouldImportCoreSchemas,
							valueTypes,
							globalSchemaNamespace: globalSchemaNamespace ?? undefined,
							typesTemplate: generateStandaloneTypesFile
								? 'schema/core.schemas.types.ts.hbs'
								: undefined,
						}
					)
				} catch (err) {
					schemaErrors.push(err)
				}
			}
		}

		this.cleanEmptyDirs(resolvedSchemaTypesDestination)

		this.ui.stopLoading()

		const errors = [...schemaErrors, ...fieldErrors]

		return actionUtil.mergeActionResults(coreSyncResults || {}, {
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

		this.ui.startLoading('Loading builders...')

		const { schemasByNamespace, errors: schemaErrors } =
			await this.schemaStore.fetchSchemas({
				localSchemaLookupDir: schemaLookupDir,
				fetchLocalSchemas,
				fetchRemoteSchemas,
				enableVersioning,
				localNamespace,
				fetchCoreSchemas,
				didUpdateHandler: (message) => {
					this.ui.startLoading(message)
				},
			})

		const hashSpruceDestination =
			resolvedSchemaTypesDestinationDirOrFile.replace(
				diskUtil.resolveHashSprucePath(this.cwd),
				'#spruce'
			)

		let total = 0
		let totalNamespaces = 0
		for (const namespace of Object.keys(schemasByNamespace)) {
			totalNamespaces++
			total += schemasByNamespace[namespace].length
		}

		this.ui.startLoading(
			`Building ${total} schemas from ${totalNamespaces} namespaces.`
		)

		const schemaTemplateItemBuilder = new SchemaTemplateItemBuilder(
			localNamespace
		)

		const schemaTemplateItems: SchemaTemplateItem[] =
			schemaTemplateItemBuilder.buildTemplateItems(
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

		const action = this.Action('schema', 'syncFields')
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
		globalSchemaNamespace?: string
	}) {
		this.ui.startLoading('Generating value types...')

		const builder = new ValueTypeBuilder(
			this.schemaWriter,
			this.Service('import')
		)

		return builder.generateValueTypes(options)
	}

	private async deleteOrphanedSchemas(
		resolvedDestination: string,
		schemaTemplateItems: SchemaTemplateItem[]
	) {
		const definitionsToDelete =
			await schemaGeneratorUtil.filterSchemaFilesBySchemaIds(
				resolvedDestination,
				schemaTemplateItems.map((item) => ({
					...item,
					version: item.schema.version,
				}))
			)

		definitionsToDelete.forEach((def) => diskUtil.deleteFile(def))
	}

	private cleanEmptyDirs(resolvedDestination: string) {
		diskUtil.deleteEmptyDirs(resolvedDestination)
	}
}
