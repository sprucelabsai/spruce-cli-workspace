import BaseStore from './Base'
import {
	ISchemaDefinitionMap,
	ISchemaDefinition,
	Mapper as SchemaMapper
} from '@sprucelabs/schema'
import {
	userDefinition,
	userLocationDefinition,
	skillDefinition,
	locationDefinition,
	groupDefinition
} from '../temporary/schemas'

export default class SchemaStore extends BaseStore {
	public name = 'schema'

	/** get the schema map */
	public async schemaMap(): Promise<ISchemaDefinitionMap> {
		/** get all schemas from api (TODO load from API) */
		const schemas: ISchemaDefinition[] = [
			userDefinition,
			skillDefinition,
			locationDefinition,
			userLocationDefinition,
			groupDefinition
		]

		const map = SchemaMapper.generateSchemaMap(schemas)
		return Promise.resolve(map)
	}
}
