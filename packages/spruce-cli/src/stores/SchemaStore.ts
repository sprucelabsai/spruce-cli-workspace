import pathUtil from 'path'
import {
	ISchemaTemplateItem,
	IFieldTemplateItem,
	ISchemaDefinition
} from '@sprucelabs/schema'
import { IFieldRegistration } from '@sprucelabs/schema/build/utilities/registerFieldType'
import globby from 'globby'
import { uniqBy } from 'lodash'
// TODO move these into mercury api and pull from there
import ErrorCode from '#spruce/errors/errorCode'
import { LOCAL_NAMESPACE, CORE_NAMESPACE } from '../constants'
import SpruceError from '../errors/SpruceError'
import ServiceFactory, { Service } from '../factories/ServiceFactory'
import ImportService from '../services/ImportService'
import SchemaTemplateItemBuilder from '../templateItemBuilders/SchemaTemplateItemBuilder'
import {
	userDefinition,
	userLocationDefinition,
	skillDefinition,
	locationDefinition,
	groupDefinition,
	aclDefinition
} from '../temporary/schemas'
import namesUtil from '../utilities/names.utility'

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

export default class SchemaStore {
	public name = 'schema'
	public cwd: string

	private schemaBuilder: SchemaTemplateItemBuilder
	private serviceFactory: ServiceFactory

	private ImportService = (cwd?: string): ImportService => {
		return this.serviceFactory.Service(cwd ?? this.cwd, Service.Import)
	}

	public constructor(cwd: string, serviceFactory: ServiceFactory) {
		this.cwd = cwd
		this.serviceFactory = serviceFactory
		this.schemaBuilder = new SchemaTemplateItemBuilder()
	}

	public async fetchSchemaTemplateItems<T extends ISchemaTemplateItemsOptions>(
		localLookupDir: string
	): Promise<IFetchSchemaTemplateItemsResponse> {
		const schemas: ISchemaDefinition[] = [
			userDefinition,
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

		const localMatches = await this.loadLocalDefinitions(localLookupDir)
		const importService = this.ImportService()

		const loading = Promise.all(
			localMatches.map(async local =>
				importService.importDefault<ISchemaDefinition>(local)
			)
		)

		const localDefinitions = await loading
		const localTemplateItems = this.schemaBuilder.generateTemplateItems(
			LOCAL_NAMESPACE,
			localDefinitions
		)

		const templateItems = [...coreTemplateItems, ...localTemplateItems]

		return { items: templateItems, errors: [] }
		// const importService = this.ImportService()
		// // Local
		// const localErrors: SpruceError[] = []
		// TODO: Cleanup / break up statements for easier readability
		// const localDefinitions = (
		// 	await Promise.all(
		// 		(await globby([pathUtil.join(localLookupDir, '/**/*.builder.ts')])).map(
		// 			async file => {
		// 				try {
		// 					const definition = await importService.importDefault(file)
		// 					Schema.validateDefinition(definition)
		// 					return definition
		// 				} catch (err) {
		// 					localErrors.push(
		// 						new SpruceError({
		// 							code: ErrorCode.DefinitionFailedToImport,
		// 							file,
		// 							originalError: err
		// 						})
		// 					)
		// 					return false
		// 				}
		// 			}
		// 		)
		// 	)
		// ).filter(d => !!d) as ISchemaDefinition[]
		// Break out errors and definitions for
		// const errors = localErrorsOrDefinitions.filter(
		// 	local => !Schema.isDefinitionValid(local)
		// ) as SpruceError[]
		// when we get better at handling failed imports, uncomment above and update generateTemplateItems
		// If a local schema points to a core one, it requires the core one to be tracked in "definitionsById"
		// const definitionsById: { [id: string]: ISchemaDefinition } = {}
		// coreTemplateItems.forEach(templateItem => {
		// 	//@ts-ignore
		// 	definitionsById[templateItem.id] = templateItem.definition
		// })
		//@ts-ignore
		// let allTemplateItems = coreTemplateItems
		// try {
		// 	allTemplateItems = this.schemaBuilder.accumulateTemplateItems({
		// 		// @ts-ignore
		// 		namespace: 'Local',
		// 		definitions: localDefinitions,
		// 		definitionsById,
		// 		items: coreTemplateItems
		// 	})
		// } catch (err) {
		// 	localErrors.push(err)
		// }
		//@ts-ignore
		// return (includeErrors
		// 	? {
		// 			items: allTemplateItems,
		// 			errors: localErrors
		// 	  }
		// 	: [...allTemplateItems]) as SchemaTemplateItemsReturnType<T>
	}

	private async loadLocalDefinitions(localLookupDir: string) {
		return await globby(pathUtil.join(localLookupDir, '**/*.builder.ts'))
	}

	/** All field types from all skills we depend on */
	public async fetchFieldTemplateItems<T extends IFieldTemplateItemsOptions>(
		localLookupDir: string
	): Promise<IFetchFieldTemplateItemsResponse> {
		const cwd = pathUtil.join(__dirname, '..', '..')

		const localImportService = this.ImportService(cwd)

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
		const importService = this.ImportService()

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
				pkg = `#spruce/../src/fields/${registration.className}`
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

	// TODO this may need to be brought back to hold an entire class map
	// so we don't have to rely on the generated file before doing anything
	// /** Get all fields */
	// public async fieldTypeMap(): Promise<IFieldTypeMap> {
	// 	const map: IFieldTypeMap = {}
	// 	if (typeof FieldClassMap === 'object') {
	// 		Object.keys(FieldClassMap).forEach(type => {
	// 			const FieldClass = FieldClassMap[type as FieldType]
	// 			const templateDetails = FieldClass.description
	// 			map[type] = templateDetails
	// 		})
	// 	}
	// 	return map
	// }
}
