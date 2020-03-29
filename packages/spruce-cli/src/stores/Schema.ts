import BaseStore from './Base'
import {
	ISchemaDefinition,
	Template as SchemaTemplate,
	FieldClassMap,
	FieldType,
	IFieldTemplateDetails,
	ISchemaTemplateItem
} from '@sprucelabs/schema'
import {
	userDefinition,
	userLocationDefinition,
	skillDefinition,
	locationDefinition,
	groupDefinition,
	aclDefinition
} from '../temporary/schemas'

/** the schema template with namespace dropped in */
export interface ISchemaTemplateNamespaceItem extends ISchemaTemplateItem {
	namespace: string
}

/** the mapping of type keys (string, phoneNumber) to definitions */
export interface IFieldTypeMap {
	[fieldType: string]: IFieldTemplateDetails
}

export default class SchemaStore extends BaseStore {
	public name = 'schema'

	/** get the schema map */
	public async schemaTemplateItemsWithNamespace(): Promise<
		ISchemaTemplateNamespaceItem[]
	> {
		/** get all schemas from api (TODO load from API) */
		const schemas: ISchemaDefinition[] = [
			userDefinition,
			skillDefinition,
			locationDefinition,
			userLocationDefinition,
			groupDefinition,
			aclDefinition
		]

		const templateItems = SchemaTemplate.generateTemplateItems(schemas)
		const coreTemplateItems = templateItems.map(item => ({
			...item,
			namespace: 'core'
		}))

		return coreTemplateItems
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
