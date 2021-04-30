import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const requestPinEmitPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.RequestPinEmitPayloadSchema  = {
	id: 'requestPinEmitPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
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
