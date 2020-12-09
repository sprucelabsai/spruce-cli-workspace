import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'



const requestPinResponsePayloadSchema: SpruceSchemas.MercuryApi.RequestPinResponsePayloadSchema  = {
	id: 'requestPinResponsePayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'challenge': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(requestPinResponsePayloadSchema)

export default requestPinResponsePayloadSchema
