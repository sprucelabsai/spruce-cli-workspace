import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import unregisterConversationTopicsEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/unregisterConversationTopicsEmitPayload.schema'

const unregisterConversationTopicsEmitTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.UnregisterConversationTopicsEmitTargetAndPayloadSchema  = {
	id: 'unregisterConversationTopicsEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: unregisterConversationTopicsEmitPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(unregisterConversationTopicsEmitTargetAndPayloadSchema)

export default unregisterConversationTopicsEmitTargetAndPayloadSchema
