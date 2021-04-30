import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const listOrgsEmitPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.ListOrgsEmitPayloadSchema  = {
	id: 'listOrgsEmitPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'showMineOnly': {
	                type: 'boolean',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(listOrgsEmitPayloadSchema)

export default listOrgsEmitPayloadSchema
