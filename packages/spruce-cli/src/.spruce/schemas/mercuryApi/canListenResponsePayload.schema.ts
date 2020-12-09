import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'



const canListenResponsePayloadSchema: SpruceSchemas.MercuryApi.CanListenResponsePayloadSchema  = {
	id: 'canListenResponsePayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'can': {
	                type: 'boolean',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(canListenResponsePayloadSchema)

export default canListenResponsePayloadSchema
