import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'



const registerListenersEmitPayloadSchema: SpruceSchemas.MercuryApi.RegisterListenersEmitPayloadSchema  = {
	id: 'registerListenersEmitPayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'eventNamesWithOptionalNamespace': {
	                type: 'text',
	                isRequired: true,
	                isArray: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(registerListenersEmitPayloadSchema)

export default registerListenersEmitPayloadSchema
