import AbstractStore from './AbstractStore'
import {
	ISchemaDefinition,
	FieldClassMap,
	FieldType,
	IFieldTemplateDetails,
	IFieldRegistration
} from '@sprucelabs/schema'
import {
	ISchemaTypesTemplateItem,
	IFieldTypesTemplateItem
} from '@sprucelabs/spruce-templates'

import path from 'path'

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
export interface IFieldTypeMap {
	[fieldType: string]: IFieldTemplateDetails
}

export default class SchemaStore extends AbstractStore {
	public name = 'schema'

	/** Get the schema map */
	public async schemaTemplateItems(): Promise<ISchemaTypesTemplateItem[]> {
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
		const templateItems = this.utilities.schema.generateTemplateItems({
			namespace: 'core',
			definitions: schemas
		})

		return templateItems
	}

	/** All field types from all skills we depend on */
	public async fieldTemplateItems(): Promise<IFieldTypesTemplateItem[]> {
		// TODO load from core
		const coreAddons = (
			await globby([
				path.join(
					this.cwd,
					'node_modules/@sprucelabs/schema/build/src/addons/*Field.addon.js'
				)
			])
		).map(path => ({ path, isLocal: false }))

		const localAddons = (
			await globby([path.join(this.cwd, '/build/src/addons/*Field.addon.js')])
		).map(path => ({ path, isLocal: true }))

		const allAddons = [...coreAddons, ...localAddons]
		const types: IFieldTypesTemplateItem[] = []

		for (const addon of allAddons) {
			const type: IFieldRegistration = require(addon.path).default
			let pkg = type.package

			if (addon.isLocal) {
				const camelName = this.utilities.names
					.toFileNameWithoutExtension(addon.path)
					.replace('.addon', '')
				const pascalName = this.utilities.names.toPascal(camelName)

				pkg = `../../../src/fields/${pascalName}`
			}

			// Map registration to template item
			const name = type.className
			types.push({
				pascalName: this.utilities.names.toPascal(name),
				camelName: this.utilities.names.toCamel(name),
				package: pkg,
				readableName: type.className,
				pascalType: this.utilities.names.toPascal(type.type),
				camelType: this.utilities.names.toCamel(type.type),
				isLocal: addon.isLocal
			})
		}

		return types
	}

	/** Get all fields */
	public async fieldTypeMap(): Promise<IFieldTypeMap> {
		const map: IFieldTypeMap = {}
		Object.keys(FieldClassMap).forEach(type => {
			const FieldClass = FieldClassMap[type as FieldType]
			const templateDetails = FieldClass.templateDetails()
			map[type] = templateDetails
		})
		return map
	}
}
