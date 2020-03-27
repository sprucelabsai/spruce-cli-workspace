import StoreBase from './Base'
import {
	ISchemaDefinitionMap,
	ISchemaDefinition,
	Mapper as SchemaMapper,
	FieldClassMap,
	FieldType,
	IFieldTemplateDetails
} from '@sprucelabs/schema'
import {
	userDefinition,
	userLocationDefinition,
	skillDefinition,
	locationDefinition,
	groupDefinition,
	aclDefinition
} from '../temporary/schemas'
import { Mercury } from '@sprucelabs/mercury'

/** namespace is core or a skill slug */
export interface ISchemaNamespace {
	namespace: string
	schemas: ISchemaDefinitionMap
}
/** the mapping of type keys (string, phoneNumber) to definitions */
export interface IFieldTypeMap {
	[fieldType: string]: IFieldTemplateDetails
}

export default class StoreSchema extends StoreBase {
	public name = 'schema'

	/** mercury locked and loaded */
	public mercury: Mercury

	public constructor(mercury: Mercury) {
		super()
		this.mercury = mercury
	}

	/** get the schema map */
	public async schemasWithNamespace(): Promise<ISchemaNamespace[]> {
		/** get all schemas from api (TODO load from API) */
		const schemas: ISchemaDefinition[] = [
			userDefinition,
			skillDefinition,
			locationDefinition,
			userLocationDefinition,
			groupDefinition,
			aclDefinition
		]

		const map = SchemaMapper.generateSchemaMap(schemas)

		return [
			{
				namespace: 'core',
				schemas: map
			}
		]
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
