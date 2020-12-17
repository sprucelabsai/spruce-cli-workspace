import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'



const listOrgsEmitPayloadSchema: SpruceSchemas.MercuryApi.ListOrgsEmitPayloadSchema  = {
	id: 'listOrgsEmitPayload',
	namespace: 'MercuryApi',
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
