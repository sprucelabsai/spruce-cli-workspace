import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const unregisterConversationTopicsEmitPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.UnregisterConversationTopicsEmitPayloadSchema  = {
	id: 'unregisterConversationTopicsEmitPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'topics': {
	                type: 'text',
	                isArray: true,
	                options: undefined
	            },
	            /** . */
	            'shouldUnregisterAll': {
	                type: 'boolean',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(unregisterConversationTopicsEmitPayloadSchema)

export default unregisterConversationTopicsEmitPayloadSchema
