import pathUtil from 'path'
import {
	ISchemaTemplateItem,
	IFieldTemplateItem,
	ISchema,
} from '@sprucelabs/schema'
import { IFieldRegistration } from '@sprucelabs/schema/build/utilities/registerFieldType'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'
import { versionUtil } from '@sprucelabs/spruce-skill-utils'
import globby from 'globby'
import { uniqBy } from 'lodash'
import { LOCAL_NAMESPACE, CORE_NAMESPACE } from '../constants'
import SpruceError from '../errors/SpruceError'
import SchemaTemplateItemBuilder from '../templateItemBuilders/SchemaTemplateItemBuilder'
import {
	personSchema,
	personLocationSchema,
	skillSchema,
	locationSchema,
	groupSchema,
	aclSchema,
} from '../temporary/schemas'
import diskUtil from '../utilities/disk.utility'
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

		const schemaRequest = this.fetchSchemaTemplateItems({
			localSchemaDir,
			enableVersioning,
			fetchRemoteSchemas,
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

	public async fetchSchemaTemplateItems(options: {
		localSchemaDir?: string
		enableVersioning?: boolean
		fetchRemoteSchemas?: boolean
	}): Promise<IFetchSchemaTemplateItemsResponse> {
		const { localSchemaDir, enableVersioning, fetchRemoteSchemas } = options
		const errors: SpruceError[] = []

		let coreTemplateItems: ISchemaTemplateItem[] = []

		if (fetchRemoteSchemas !== false) {
			// this will move to a mercury call when ready
			const schemas: ISchema[] = [
				personSchema,
				skillSchema,
				locationSchema,
				personLocationSchema,
				groupSchema,
				aclSchema,
			]

			coreTemplateItems = this.schemaBuilder.generateTemplateItems(
				CORE_NAMESPACE,
				schemas
			)
		}

		const localDefinitions = await this.loadLocalBuilders(
			localSchemaDir,
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
							code: 'VERSION_MISSING_ERROR',
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
			})
		}

		return { items: types, errors: localErrors }
	}
}
