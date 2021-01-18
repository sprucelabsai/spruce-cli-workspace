import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const canListenResponsePayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.CanListenResponsePayloadSchema  = {
	id: 'canListenResponsePayload',
	version: 'v2020_12_25',
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
