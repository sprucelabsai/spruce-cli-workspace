import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'



const unRegisterListenersEmitPayloadSchema: SpruceSchemas.MercuryApi.UnRegisterListenersEmitPayloadSchema  = {
	id: 'unRegisterListenersEmitPayload',
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

SchemaRegistry.getInstance().trackSchema(unRegisterListenersEmitPayloadSchema)

export default unRegisterListenersEmitPayloadSchema
