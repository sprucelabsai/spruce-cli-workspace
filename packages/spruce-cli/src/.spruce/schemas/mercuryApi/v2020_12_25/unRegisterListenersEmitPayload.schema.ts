import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const unRegisterListenersEmitPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.UnRegisterListenersEmitPayloadSchema  = {
	id: 'unRegisterListenersEmitPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'eventNamesWithOptionalNamespace': {
	                type: 'text',
	                isArray: true,
	                options: undefined
	            },
	            /** . */
	            'shouldUnRegisterAll': {
	                type: 'boolean',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(unRegisterListenersEmitPayloadSchema)

export default unRegisterListenersEmitPayloadSchema
