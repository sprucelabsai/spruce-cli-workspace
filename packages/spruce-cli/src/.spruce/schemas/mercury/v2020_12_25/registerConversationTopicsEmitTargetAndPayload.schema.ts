import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import registerConversationTopicsEmitPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/registerConversationTopicsEmitPayload.schema'

const registerConversationTopicsEmitTargetAndPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.RegisterConversationTopicsEmitTargetAndPayloadSchema  = {
	id: 'registerConversationTopicsEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: registerConversationTopicsEmitPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(registerConversationTopicsEmitTargetAndPayloadSchema)

export default registerConversationTopicsEmitTargetAndPayloadSchema
