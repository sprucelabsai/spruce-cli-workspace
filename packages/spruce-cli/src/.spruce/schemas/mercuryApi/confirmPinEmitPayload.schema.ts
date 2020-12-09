import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'



const confirmPinEmitPayloadSchema: SpruceSchemas.MercuryApi.ConfirmPinEmitPayloadSchema  = {
	id: 'confirmPinEmitPayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'challenge': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'pin': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(confirmPinEmitPayloadSchema)

export default confirmPinEmitPayloadSchema
