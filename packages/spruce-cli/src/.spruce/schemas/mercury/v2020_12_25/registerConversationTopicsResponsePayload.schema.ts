import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const registerConversationTopicsResponsePayloadSchema: SpruceSchemas.Mercury.v2020_12_25.RegisterConversationTopicsResponsePayloadSchema  = {
	id: 'registerConversationTopicsResponsePayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	    }
}

SchemaRegistry.getInstance().trackSchema(registerConversationTopicsResponsePayloadSchema)

export default registerConversationTopicsResponsePayloadSchema
