import AbstractStore from './AbstractStore'
import {
	ISchemaDefinition,
	FieldClassMap,
	FieldType,
	IFieldTemplateDetails
} from '@sprucelabs/schema'
import { ISchemaTypesTemplateItem } from '@sprucelabs/spruce-templates'
import {
	userDefinition,
	userLocationDefinition,
	skillDefinition,
	locationDefinition,
	groupDefinition,
	aclDefinition
} from '../temporary/schemas'

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
