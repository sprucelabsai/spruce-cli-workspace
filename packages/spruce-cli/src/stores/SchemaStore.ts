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

	public async fieldTemplateItems(): Promise<IFieldTypesTemplateItem[]> {
		// TODO load from core
		const coreAddons = await globby(
			path.join(
				this.cwd,
				'node_modules/@sprucelabs/schema/build/src/addons/*.addon.js'
			)
		)
		const types: IFieldTypesTemplateItem[] = []

		for (const addon of coreAddons) {
			const type: IFieldRegistration = require(addon).default

			// Map registration to template item
			const name = type.className.replace('Field', '')
			types.push({
				pascalName: this.utilities.names.toPascal(name),
				camelName: this.utilities.names.toCamel(name),
				package: type.package,
				readableName: type.className,
				pascalType: this.utilities.names.toPascal(type.type),
				camelType: this.utilities.names.toCamel(type.type)
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
