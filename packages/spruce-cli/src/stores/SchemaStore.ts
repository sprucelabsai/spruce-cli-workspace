import pathUtil from 'path'
import {
	ISchemaTemplateItem,
	IFieldTemplateItem,
	ISchemaDefinition
} from '@sprucelabs/schema'
import { IFieldRegistration } from '@sprucelabs/schema/build/utilities/registerFieldType'
import globby from 'globby'
import { uniqBy } from 'lodash'
import ErrorCode from '#spruce/errors/errorCode'
import { LOCAL_NAMESPACE, CORE_NAMESPACE } from '../constants'
import SpruceError from '../errors/SpruceError'
import ServiceFactory, {
	Service,
	IServiceProvider,
	IServices
} from '../factories/ServiceFactory'
import SchemaTemplateItemBuilder from '../templateItemBuilders/SchemaTemplateItemBuilder'
import {
	personDefinition,
	userLocationDefinition,
	skillDefinition,
	locationDefinition,
	groupDefinition,
	aclDefinition
} from '../temporary/schemas'
import diskUtil from '../utilities/disk.utility'
import namesUtil from '../utilities/names.utility'
import versionUtil from '../utilities/version.utility'

interface IFetchSchemaTemplateItemsResponse {
	items: ISchemaTemplateItem[]
	errors: SpruceError[]
}

interface IFetchFieldTemplateItemsResponse {
	items: IFieldTemplateItem[]
	errors: SpruceError[]
}

export interface ISchemaTemplateItemsOptions {
	localLookupDir: string
}

export interface IFieldTemplateItemsOptions
	extends ISchemaTemplateItemsOptions {}

interface IAddonItem {
	path: string
	registration: IFieldRegistration
	isLocal: boolean
}

export default class SchemaStore implements IServiceProvider {
	public cwd: string

	private schemaBuilder: SchemaTemplateItemBuilder
	private serviceFactory: ServiceFactory

	public Service<S extends Service>(type: S, cwd?: string): IServices[S] {
		return this.serviceFactory.Service(cwd ?? this.cwd, type)
	}

	public constructor(cwd: string, serviceFactory: ServiceFactory) {
		this.cwd = cwd
		this.serviceFactory = serviceFactory
		this.schemaBuilder = new SchemaTemplateItemBuilder()
	}

	public async fetchAllTemplateItems(
		localSchemaDir?: string,
		localAddonDir?: string
	) {
		const schemaRequest = this.fetchSchemaTemplateItems(
			diskUtil.resolvePath(this.cwd, localSchemaDir ?? 'src/schemas')
		)
		const fieldRequest = this.fetchFieldTemplateItems(
			diskUtil.resolvePath(this.cwd, localAddonDir ?? 'src/addons')
		)

		const [schemaResults, fieldResults] = await Promise.all([
			schemaRequest,
			fieldRequest
		])

		return {
			schemas: schemaResults,
			fields: fieldResults
		}
	}

	public async fetchSchemaTemplateItems(
		localLookupDir: string
	): Promise<IFetchSchemaTemplateItemsResponse> {
		const schemas: ISchemaDefinition[] = [
			personDefinition,
			skillDefinition,
			locationDefinition,
			userLocationDefinition,
			groupDefinition,
			aclDefinition
		]

		const coreTemplateItems = this.schemaBuilder.generateTemplateItems(
			CORE_NAMESPACE,
			schemas
		)

		const localDefinitions = await this.loadLocalDefinitions(localLookupDir)
		const localTemplateItems = this.schemaBuilder.generateTemplateItems(
			LOCAL_NAMESPACE,
			localDefinitions
		)

		const templateItems = [...coreTemplateItems, ...localTemplateItems]

		return { items: templateItems, errors: [] }
	}

	private async loadLocalDefinitions(localLookupDir: string) {
		const localMatches = await globby(
			pathUtil.join(localLookupDir, '**/*.builder.ts')
		)

		const schemaService = this.Service(Service.Schema)

		const loading = Promise.all(
			localMatches.map(async local => {
				const definition = await schemaService.importDefinition(local)
				const version = versionUtil.latestVersionAtPath(
					pathUtil.join(pathUtil.dirname(local), '..')
				)
				definition.version = version.constValue

				return definition
			})
		)

		return loading
	}

	public async fetchFieldTemplateItems<T extends IFieldTemplateItemsOptions>(
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
					)
				])
			).map(async path => {
				const registration = await localImportService.importDefault<
					IFieldRegistration
				>(path)

				return {
					path,
					registration,
					isLocal: false
				}
			})
		)

		const localErrors: SpruceError[] = []
		const importService = this.Service(Service.Import)

		const localAddons = (
			await Promise.all(
				(await globby([pathUtil.join(localLookupDir, '/*Field.addon.ts')])).map(
					async file => {
						try {
							const registration = await importService.importDefault<
								IFieldRegistration
							>(file)

							return {
								path: file,
								registration,
								isLocal: true
							}
						} catch (err) {
							localErrors.push(
								new SpruceError({
									code: ErrorCode.FailedToImport,
									file,
									originalError: err
								})
							)
							return false
						}
					}
				)
			)
		).filter(addon => !!addon) as IAddonItem[]

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
				valueTypeGeneratorType: registration.valueTypeGeneratorType
			})
		}

		return { items: types, errors: localErrors }
	}
}
