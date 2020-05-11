import pathUtil from 'path'
import {
	ISchemaDefinition,
	IFieldRegistration,
	ISchemaTemplateItem,
	IFieldTemplateItem
} from '@sprucelabs/schema'
import Schema from '@sprucelabs/schema/build/Schema'
import globby from 'globby'
import { uniqBy } from 'lodash'
// TODO move these into mercury api and pull from there
import { ErrorCode } from '../../.spruce/errors/codes.types'
import SpruceError from '../errors/SpruceError'
import {
	userDefinition,
	userLocationDefinition,
	skillDefinition,
	locationDefinition,
	groupDefinition,
	aclDefinition
} from '../temporary/schemas'
import AbstractStore from './AbstractStore'

/** The mapping of type keys (string, phoneNumber) to definitions */
// export interface IFieldTypeMap {
// 	[fieldType: string]: IFieldTemplateDetails
// }

export interface ISchemaTemplateItemsOptions {
	includeErrors?: boolean
}

export interface IFieldTemplateItemsOptions
	extends ISchemaTemplateItemsOptions {}

type SchemaTemplateItemsReturnType<
	T extends ISchemaTemplateItemsOptions
> = T['includeErrors'] extends false
	? ISchemaTemplateItem[]
	: {
			items: ISchemaTemplateItem[]
			errors: SpruceError[]
	  }

type FieldTemplateItemsReturnType<
	T extends IFieldTemplateItemsOptions
> = T['includeErrors'] extends false
	? IFieldTemplateItem[]
	: { items: IFieldTemplateItem[]; errors: SpruceError[] }

interface IAddonItem {
	path: string
	registration: IFieldRegistration
	isLocal: boolean
}

export default class SchemaStore extends AbstractStore {
	public name = 'schema'

	/** Get the schema map supplied by core */
	public async schemaTemplateItems<T extends ISchemaTemplateItemsOptions>(
		options?: T
	): Promise<SchemaTemplateItemsReturnType<T>> {
		const { includeErrors = true } = options ?? {}

		/** Get all schemas from api  */
		// TODO load from api
		const schemas: ISchemaDefinition[] = [
			userDefinition,
			skillDefinition,
			locationDefinition,
			userLocationDefinition,
			groupDefinition,
			aclDefinition
		]

		// Each skill's slug will be the namespace
		const coreTemplateItems = this.utilities.schema.generateTemplateItems({
			namespace: 'Core',
			definitions: schemas
		})

		// Local
		const localErrors: SpruceError[] = []
		// TODO: Cleanup / break up statements for easier readability
		const localDefinitions = (
			await Promise.all(
				(
					await globby([
						pathUtil.join(this.cwd, '/src/schemas/**/*.definition.ts')
					])
				).map(async file => {
					try {
						const definition = await this.services.child.importDefault(file, {
							cwd: this.cwd
						})
						Schema.validateDefinition(definition)
						return definition
					} catch (err) {
						localErrors.push(
							new SpruceError({
								code: ErrorCode.DefinitionFailedToImport,
								file,
								originalError: err
							})
						)
						return false
					}
				})
			)
		).filter(d => !!d) as ISchemaDefinition[]

		// Break out errors and definitions for
		// const errors = localErrorsOrDefinitions.filter(
		// 	local => !Schema.isDefinitionValid(local)
		// ) as SpruceError[]
		// when we get better at handling failed imports, uncomment above and update generateTemplateItems

		// If a local schema points to a core one, it requires the core one to be tracked in "definitionsById"
		const definitionsById: { [id: string]: ISchemaDefinition } = {}

		coreTemplateItems.forEach(templateItem => {
			definitionsById[templateItem.id] = templateItem.definition
		})

		let allTemplateItems = coreTemplateItems
		try {
			allTemplateItems = this.utilities.schema.generateTemplateItems({
				namespace: 'Local',
				definitions: localDefinitions,
				definitionsById,
				items: coreTemplateItems
			})
		} catch (err) {
			localErrors.push(err)
		}

		return (includeErrors
			? {
					items: allTemplateItems,
					errors: localErrors
			  }
			: [...allTemplateItems]) as SchemaTemplateItemsReturnType<T>
	}

	/** All field types from all skills we depend on */
	public async fieldTemplateItems<T extends IFieldTemplateItemsOptions>(
		options?: T
	): Promise<FieldTemplateItemsReturnType<T>> {
		const { includeErrors = true } = options || {}
		const cwd = pathUtil.join(__dirname, '..', '..')
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
				// Import from
				const registration = await this.services.vm.importAddon<
					IFieldRegistration
				>(path, { cwd })
				return {
					path,
					registration,
					isLocal: false
				}
			})
		)

		const localErrors: SpruceError[] = []
		const localAddons = (
			await Promise.all(
				(
					await globby([pathUtil.join(this.cwd, '/src/addons/*Field.addon.ts')])
				).map(async file => {
					try {
						const registration = await this.services.vm.importAddon<
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
				})
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
				pascalName: this.utilities.names.toPascal(name),
				camelName: this.utilities.names.toCamel(name),
				package: pkg,
				className: registration.className,
				importAs,
				readableName: registration.className,
				pascalType: this.utilities.names.toPascal(registration.type),
				camelType: this.utilities.names.toCamel(registration.type),
				isLocal: addon.isLocal,
				description: registration.description
			})
		}

		return (includeErrors
			? { items: types, errors: localErrors }
			: types) as FieldTemplateItemsReturnType<T>
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
