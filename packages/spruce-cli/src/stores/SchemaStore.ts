import AbstractStore from './AbstractStore'
import {
	ISchemaDefinition,
	IFieldRegistration,
	ISchemaTemplateItem,
	IFieldTemplateItem
} from '@sprucelabs/schema'

import path from 'path'
import { uniqBy } from 'lodash'

// TODO move these into mercury api and pull from there
import {
	userDefinition,
	userLocationDefinition,
	skillDefinition,
	locationDefinition,
	groupDefinition,
	aclDefinition
} from '../temporary/schemas'
import globby from 'globby'

/** The mapping of type keys (string, phoneNumber) to definitions */
// export interface IFieldTypeMap {
// 	[fieldType: string]: IFieldTemplateDetails
// }

export default class SchemaStore extends AbstractStore {
	public name = 'schema'

	/** Get the schema map supplied by core */
	public async schemaTemplateItems(): Promise<ISchemaTemplateItem[]> {
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
			namespace: 'core',
			definitions: schemas
		})

		// Local
		const localDefinitions = await Promise.all(
			(
				await globby([
					path.join(this.cwd, '/build/src/schemas/**/*.definition.js'),
					path.join(this.cwd, '/src/schemas/**/*.definition.ts')
				])
			).map(async path => {
				const definition = await this.utilities.child.importDefault<
					ISchemaDefinition
				>(path)
				return definition
			})
		)

		const localTemplateItems = this.utilities.schema.generateTemplateItems({
			namespace: 'local',
			definitions: localDefinitions
		})

		return [...coreTemplateItems, ...localTemplateItems]
	}

	/** All field types from all skills we depend on */
	public async fieldTemplateItems(): Promise<IFieldTemplateItem[]> {
		// TODO load from core
		const coreAddons = await Promise.all(
			(
				await globby([
					path.join(
						this.cwd,
						'node_modules/@sprucelabs/schema/build/addons/*Field.addon.js'
					),
					path.join(
						this.cwd,
						'../../node_modules/@sprucelabs/schema/build/addons/*Field.addon.js'
					)
				])
			).map(async path => {
				const registration = await this.services.vm.importAddon<
					IFieldRegistration
				>(path)
				return {
					path,
					registration,
					isLocal: false
				}
			})
		)

		const localAddons = await Promise.all(
			(
				await globby([
					path.join(this.cwd, '/build/src/addons/*Field.addon.js'),
					path.join(this.cwd, '/src/addons/*Field.addon.ts')
				])
			).map(async path => {
				const registration = await this.services.vm.importAddon<
					IFieldRegistration
				>(path)
				return {
					path,
					registration,
					isLocal: true
				}
			})
		)

		const allAddons = uniqBy(
			[...coreAddons, ...localAddons],
			'registration.type'
		)
		const types: IFieldTemplateItem[] = []

		for (const addon of allAddons) {
			const registration: IFieldRegistration = addon.registration
			let pkg = registration.package

			if (addon.isLocal) {
				const camelName = this.utilities.names
					.toFileNameWithoutExtension(addon.path)
					.replace('.addon', '')
				const pascalName = this.utilities.names.toPascal(camelName)

				pkg = `../../../src/fields/${pascalName}`
			}

			// Map registration to template item
			const name = registration.className
			types.push({
				pascalName: this.utilities.names.toPascal(name),
				camelName: this.utilities.names.toCamel(name),
				package: pkg,
				importAs: registration.importAs,
				readableName: registration.className,
				pascalType: this.utilities.names.toPascal(registration.type),
				camelType: this.utilities.names.toCamel(registration.type),
				isLocal: addon.isLocal,
				description: registration.description
			})
		}

		return types
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
