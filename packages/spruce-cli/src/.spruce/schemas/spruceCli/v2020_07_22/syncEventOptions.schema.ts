import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const syncEventOptionsSchema: SpruceSchemas.SpruceCli.v2020_07_22.SyncEventOptionsSchema  = {
	id: 'syncEventOptions',
	version: 'v2020_07_22',
	namespace: 'SpruceCli',
	name: 'sync event action',
	    fields: {
	            /** Contract destination. Where I will generate event contracts. */
	            'contractDestinationDir': {
	                label: 'Contract destination',
	                type: 'text',
	                hint: 'Where I will generate event contracts.',
	                defaultValue: "#spruce/events",
	                options: undefined
	            },
	            /** Schema types lookup directory. Where I will lookup schema types and interfaces. */
	            'schemaTypesLookupDir': {
	                label: 'Schema types lookup directory',
	                type: 'text',
	                hint: 'Where I will lookup schema types and interfaces.',
	                defaultValue: "#spruce/schemas",
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(syncEventOptionsSchema)

export default syncEventOptionsSchema
