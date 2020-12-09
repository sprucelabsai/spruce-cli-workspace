import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'



const requestPinEmitPayloadSchema: SpruceSchemas.MercuryApi.RequestPinEmitPayloadSchema  = {
	id: 'requestPinEmitPayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'phone': {
	                type: 'phone',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(requestPinEmitPayloadSchema)

export default requestPinEmitPayloadSchema
