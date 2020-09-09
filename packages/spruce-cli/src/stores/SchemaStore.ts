import pathUtil from 'path'
import {
	ISchemaTemplateItem,
	IFieldTemplateItem,
	ISchema,
} from '@sprucelabs/schema'
import { IFieldRegistration } from '@sprucelabs/schema'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'
import { versionUtil } from '@sprucelabs/spruce-skill-utils'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { LOCAL_NAMESPACE, CORE_NAMESPACE } from '@sprucelabs/spruce-skill-utils'
import globby from 'globby'
import { uniqBy } from 'lodash'
import SpruceError from '../errors/SpruceError'
import SchemaTemplateItemBuilder from '../templateItemBuilders/SchemaTemplateItemBuilder'
import {
	personSchema,
	personLocationSchema,
	skillSchema,
	locationSchema,
	aclSchema,
} from '../temporary/schemas'
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

interface IFetchSchemasResults {
	schemasByNamespace: { [namespace: string]: ISchema[] }
	errors: SpruceError[]
}

interface IFetchFieldsResults {
	errors: SpruceError[]
	fields: { path: string; registration: IFieldRegistration; isLocal: boolean }[]
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

	public async fetchSchemas(options?: {
		localSchemaDir?: string
	}): Promise<IFetchSchemasResults> {
		const { localSchemaDir } = options || {}

		const results: IFetchSchemasResults = {
			errors: [],
			schemasByNamespace: {
				// TODO - move to mercury request when mercury-api is running
				[CORE_NAMESPACE]: [
					personSchema,
					skillSchema,
					locationSchema,
					personLocationSchema,
					aclSchema,
				],
			},
		}

		if (localSchemaDir) {
			const locals = await this.loadLocalSchemas(localSchemaDir)
			results.schemasByNamespace[LOCAL_NAMESPACE] = locals.schemas
			results.errors.push(...locals.errors)
		}

		return results
	}

	/** @deprecated */
	public async fetchAllTemplateItems(options: {
		localSchemaDir?: string
		localAddonDir?: string
		enableVersioning?: boolean
		fetchRemoteSchemas?: boolean
		destinationDir: string
	}) {
		const {
			localSchemaDir,
			localAddonDir,
			enableVersioning,
			fetchRemoteSchemas,
			destinationDir,
		} = options

		const schemaRequest = this.fetchSchemaTemplateItems({
			localSchemaDir,
			enableVersioning,
			fetchRemoteSchemas,
			destinationDir,
		})

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

	/** @deprecated */
	public async fetchSchemaTemplateItems(options: {
		localSchemaDir?: string
		enableVersioning?: boolean
		fetchRemoteSchemas?: boolean
		destinationDir: string
	}): Promise<IFetchSchemaTemplateItemsResponse> {
		const {
			localSchemaDir,
			enableVersioning,
			fetchRemoteSchemas,
			destinationDir,
		} = options
		const errors: SpruceError[] = []

		let coreTemplateItems: ISchemaTemplateItem[] = []

		if (fetchRemoteSchemas !== false) {
			// this will move to a mercury call when ready
			const schemas: ISchema[] = [
				personSchema,
				skillSchema,
				locationSchema,
				personLocationSchema,
				aclSchema,
			]

			coreTemplateItems = this.schemaBuilder.generateTemplateItems(
				CORE_NAMESPACE,
				schemas,
				destinationDir
			)
		}

		const localDefinitions = await this.loadLocalBuilders(
			localSchemaDir,
			enableVersioning
		)

		errors.push(...localDefinitions.errors)

		const localTemplateItems = this.schemaBuilder.generateTemplateItems(
			LOCAL_NAMESPACE,
			localDefinitions.definitions,
			destinationDir
		)

		const templateItems = [...coreTemplateItems, ...localTemplateItems]

		return { items: templateItems, errors }
	}

	private async loadLocalSchemas(
		localLookupDir: string,
		enableVersioning?: boolean
	) {
		const localMatches = await globby(
			pathUtil.join(
				diskUtil.resolvePath(this.cwd, localLookupDir),
				'**/*.builder.[t|j]s'
			)
		)

		const schemaService = this.Service('schema')
		const errors: SpruceError[] = []
		const schemas: ISchema[] = []

		await Promise.all(
			localMatches.map(async (local) => {
				let version: undefined | string

				try {
					version =
						enableVersioning === false
							? undefined
							: versionUtil.extractVersion(this.cwd, local).dirValue
				} catch (err) {
					errors.push(
						new SpruceError({
							// @ts-ignore
							code: 'VERSION_MISSING',
							friendlyMessage: `It looks like your schema's are not versioned. Make sure schemas are in a directory like src/schemas/${
								versionUtil.generateVersion().dirValue
							}/*.ts`,
						})
					)
				}

				if (version || enableVersioning === false) {
					try {
						const schema = await schemaService.importSchema(local)
						schema.version = version

						schemas.push(schema)
					} catch (err) {
						errors.push(
							new SpruceError({
								code: 'SCHEMA_FAILED_TO_IMPORT',
								file: local,
								originalError: err,
							})
						)
					}
				}
			})
		)

		return {
			schemas,
			errors,
		}
	}

	/** @deprecated */
	private async loadLocalBuilders(
		localLookupDir?: string,
		enableVersioning?: boolean
	) {
		const localMatches = await globby(
			pathUtil.join(
				diskUtil.resolvePath(this.cwd, localLookupDir ?? 'src/schemas'),
				'**/*.builder.[t|j]s'
			)
		)

		const schemaService = this.Service('schema')
		const errors: SpruceError[] = []
		const definitions: ISchema[] = []

		await Promise.all(
			localMatches.map(async (local) => {
				let version: undefined | string

				try {
					version =
						enableVersioning === false
							? undefined
							: versionUtil.extractVersion(this.cwd, local).dirValue
				} catch (err) {
					errors.push(
						new SpruceError({
							// @ts-ignore
							code: 'VERSION_MISSING',
							friendlyMessage: `It looks like your schema's are not versioned. Make sure schemas are in a directory like src/schemas/${
								versionUtil.generateVersion().dirValue
							}/*.ts`,
						})
					)
				}

				if (version || enableVersioning === false) {
					try {
						const schema = await schemaService.importSchema(local)
						schema.version = version

						definitions.push(schema)
					} catch (err) {
						errors.push(
							new SpruceError({
								code: 'SCHEMA_FAILED_TO_IMPORT',
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

	public async fetchFields(options?: {
		localAddonsDir?: string
	}): Promise<IFetchFieldsResults> {
		const { localAddonsDir } = options || {}

		const cwd = pathUtil.join(__dirname, '..', '..')
		const localImportService = this.Service('import', cwd)

		// TODO load from mercury-api when live
		const coreAddonsPromise = Promise.all(
			(
				await globby([
					pathUtil.join(
						cwd,
						'node_modules/@sprucelabs/schema/build/addons/*Field.addon.js'
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
		const importService = this.Service('import')

		const localAddonsPromise =
			localAddonsDir &&
			Promise.all(
				(
					await globby([pathUtil.join(localAddonsDir, '/*Field.addon.[t|j]s')])
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
								code: 'FAILED_TO_IMPORT',
								file,
								originalError: err,
							})
						)
						return false
					}
				})
			)

		const [coreAddons, localAddons] = await Promise.all([
			coreAddonsPromise,
			localAddonsPromise || Promise.resolve([]),
		])

		const allFields = uniqBy(
			[
				...coreAddons,
				...(localAddons.filter((addon) => !!addon) as IAddonItem[]),
			],
			'registration.type'
		)

		return {
			fields: allFields,
			errors: localErrors,
		}
	}

	/** @deprecated */
	public async fetchFieldTemplateItems(
		localLookupDir: string
	): Promise<IFetchFieldTemplateItemsResponse> {
		const cwd = pathUtil.join(__dirname, '..', '..')
		const localImportService = this.Service('import', cwd)

		// TODO load from core
		const coreAddonsPromise = Promise.all(
			(
				await globby([
					pathUtil.join(
						cwd,
						'node_modules/@sprucelabs/schema/build/addons/*Field.addon.js'
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
		const importService = this.Service('import')

		const localAddonsPromise = Promise.all(
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
							code: 'FAILED_TO_IMPORT',
							file,
							originalError: err,
						})
					)
					return false
				}
			})
		)

		const [coreAddons, localAddons] = await Promise.all([
			coreAddonsPromise,
			localAddonsPromise,
		])

		const allAddons = uniqBy(
			[
				...coreAddons,
				...(localAddons.filter((addon) => !!addon) as IAddonItem[]),
			],
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
				valueTypeMapper: registration.valueTypeMapper,
			})
		}

		return { items: types, errors: localErrors }
	}
}
