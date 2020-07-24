import pathUtil from 'path'
import {
	ISchemaTemplateItem,
	IFieldTemplateItem,
	ISchemaDefinition,
} from '@sprucelabs/schema'
import { IFieldRegistration } from '@sprucelabs/schema/build/utilities/registerFieldType'
import globby from 'globby'
import { uniqBy } from 'lodash'
import ErrorCode from '#spruce/errors/errorCode'
import { LOCAL_NAMESPACE, CORE_NAMESPACE } from '../constants'
import SpruceError from '../errors/SpruceError'
import { Service } from '../factories/ServiceFactory'
import SchemaTemplateItemBuilder from '../templateItemBuilders/SchemaTemplateItemBuilder'
import {
	personDefinition,
	userLocationDefinition,
	skillDefinition,
	locationDefinition,
	groupDefinition,
	aclDefinition,
} from '../temporary/schemas'
import diskUtil from '../utilities/disk.utility'
import namesUtil from '../utilities/names.utility'
import versionUtil from '../utilities/version.utility'
import AbstractStore, { IStoreOptions } from './AbstractStore'

interface IFetchSchemaTemplateItemsResponse {
	items: ISchemaTemplateItem[]
	errors: SpruceError[]
}

interface IFetchFieldTemplateItemsResponse {
	items: IFieldTemplateItem[]
	errors: SpruceError[]
}

interface IAddonItem {
	path: string
	registration: IFieldRegistration
	isLocal: boolean
}

export default class SchemaStore extends AbstractStore {
	private schemaBuilder: SchemaTemplateItemBuilder

	public constructor(
		options: IStoreOptions & { schemaBuilder?: SchemaTemplateItemBuilder }
	) {
		super(options)
		this.schemaBuilder =
			options.schemaBuilder ?? new SchemaTemplateItemBuilder()
	}

	public async fetchAllTemplateItems(options?: {
		localSchemaDir?: string
		localAddonDir?: string
		enableVersioning?: boolean
		fetchRemoteSchemas?: boolean
	}) {
		const {
			localSchemaDir,
			localAddonDir,
			enableVersioning,
			fetchRemoteSchemas,
		} = options || {}

		const schemaRequest = this.fetchSchemaTemplateItems(
			diskUtil.resolvePath(this.cwd, localSchemaDir ?? 'src/schemas'),
			enableVersioning,
			fetchRemoteSchemas
		)
		const fieldRequest = this.fetchFieldTemplateItems(
			diskUtil.resolvePath(this.cwd, localAddonDir ?? 'src/addons')
		)

		const [schemaResults, fieldResults] = await Promise.all([
			schemaRequest,
			fieldRequest,
		])

		return {
			schemas: schemaResults,
			fields: fieldResults,
		}
	}

	public async fetchSchemaTemplateItems(
		localLookupDir: string,
		enableVersioning?: boolean,
		fetchRemoteSchemas?: boolean
	): Promise<IFetchSchemaTemplateItemsResponse> {
		const errors: SpruceError[] = []
		let coreTemplateItems: ISchemaTemplateItem[] = []

		if (fetchRemoteSchemas !== false) {
			// this will move to a mercury call when ready
			const schemas: ISchemaDefinition[] = [
				personDefinition,
				skillDefinition,
				locationDefinition,
				userLocationDefinition,
				groupDefinition,
				aclDefinition,
			]

			coreTemplateItems = this.schemaBuilder.generateTemplateItems(
				CORE_NAMESPACE,
				schemas
			)
		}

		const localDefinitions = await this.loadLocalDefinitions(
			localLookupDir,
			enableVersioning
		)

		errors.push(...localDefinitions.errors)

		const localTemplateItems = this.schemaBuilder.generateTemplateItems(
			LOCAL_NAMESPACE,
			localDefinitions.definitions
		)

		const templateItems = [...coreTemplateItems, ...localTemplateItems]

		return { items: templateItems, errors }
	}

	private async loadLocalDefinitions(
		localLookupDir: string,
		enableVersioning?: boolean
	) {
		const localMatches = await globby(
			pathUtil.join(localLookupDir, '**/*.builder.[t|j]s')
		)

		const schemaService = this.Service(Service.Schema)
		const errors: SpruceError[] = []
		const definitions: ISchemaDefinition[] = []

		await Promise.all(
			localMatches.map(async (local) => {
				let version: undefined | string

				try {
					version =
						enableVersioning === false
							? undefined
							: versionUtil.latestVersionAtPath(
									pathUtil.join(pathUtil.dirname(local), '..')
							  ).dirValue
				} catch (err) {
					errors.push(
						new SpruceError({
							// @ts-ignore
							code: 'VERSION_MISSING_ERROR',
							friendlyMessage: `It looks like your schema's are not versioned. Make sure schemas are in a directory like src/schemas/${
								versionUtil.generateVersion().dirValue
							}/*.ts`,
						})
					)
				}

				if (version || enableVersioning === false) {
					try {
						const definition = await schemaService.importDefinition(local)
						definition.version = version

						definitions.push(definition)
					} catch (err) {
						errors.push(
							new SpruceError({
								code: ErrorCode.DefinitionFailedToImport,
								file: local,
								originalError: err,
							})
						)
					}
				}
			})
		)

		return {
			definitions,
			errors,
		}
	}

	public async fetchFieldTemplateItems(
		localLookupDir: string
	): Promise<IFetchFieldTemplateItemsResponse> {
		const cwd = pathUtil.join(__dirname, '..', '..')
		const localImportService = this.Service(Service.Import, cwd)

		// TODO load from core
		const coreAddons = await Promise.all(
			(
				await globby([
					pathUtil.join(
						cwd,
						'node_modules/@sprucelabs/schema/build/addons/*Field.addon.js'
					),
					pathUtil.join(
						cwd,
						'../../node_modules/@sprucelabs/schema/build/addons/*Field.addon.js'
					),
				])
			).map(async (path) => {
				const registration = await localImportService.importDefault<
					IFieldRegistration
				>(path)

				return {
					path,
					registration,
					isLocal: false,
				}
			})
		)

		const localErrors: SpruceError[] = []
		const importService = this.Service(Service.Import)

		const localAddons = (
			await Promise.all(
				(
					await globby([pathUtil.join(localLookupDir, '/*Field.addon.[t|j]s')])
				).map(async (file) => {
					try {
						const registration = await importService.importDefault<
							IFieldRegistration
						>(file)

						return {
							path: file,
							registration,
							isLocal: true,
						}
					} catch (err) {
						localErrors.push(
							new SpruceError({
								code: ErrorCode.FailedToImport,
								file,
								originalError: err,
							})
						)
						return false
					}
				})
			)
		).filter((addon) => !!addon) as IAddonItem[]

		const allAddons = uniqBy(
			[...coreAddons, ...localAddons],
			'registration.type'
		)
		const types: IFieldTemplateItem[] = []
		let generatedImportAsCount = 0

		for (const addon of allAddons) {
			const registration = addon.registration
			let pkg = registration.package
			let importAs = registration.importAs

			if (addon.isLocal) {
				pkg = `#spruce/../fields/${registration.className}`
				importAs = `generated_import_${generatedImportAsCount++}`
			}

			// Map registration to template item
			const name = registration.className

			types.push({
				namePascal: namesUtil.toPascal(name),
				nameCamel: namesUtil.toCamel(name),
				package: pkg,
				className: registration.className,
				importAs,
				nameReadable: registration.className,
				pascalType: namesUtil.toPascal(registration.type),
				camelType: namesUtil.toCamel(registration.type),
				isLocal: addon.isLocal,
				description: registration.description,
				valueTypeGeneratorType: registration.valueTypeGeneratorType,
			})
		}

		return { items: types, errors: localErrors }
	}
}
