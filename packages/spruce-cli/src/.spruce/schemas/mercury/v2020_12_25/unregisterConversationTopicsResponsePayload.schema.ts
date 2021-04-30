import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const unregisterConversationTopicsResponsePayloadSchema: SpruceSchemas.Mercury.v2020_12_25.UnregisterConversationTopicsResponsePayloadSchema  = {
	id: 'unregisterConversationTopicsResponsePayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	    }
}

SchemaRegistry.getInstance().trackSchema(unregisterConversationTopicsResponsePayloadSchema)

export default unregisterConversationTopicsResponsePayloadSchema
