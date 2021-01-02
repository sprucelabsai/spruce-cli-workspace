import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const registerListenersEmitPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.RegisterListenersEmitPayloadSchema  = {
	id: 'registerListenersEmitPayload',
	version: 'v2020_12_25',
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
