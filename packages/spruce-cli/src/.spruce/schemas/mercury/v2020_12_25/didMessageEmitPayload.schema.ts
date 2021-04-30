import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import messageSchema from '#spruce/schemas/spruce/v2020_07_22/message.schema'

const didMessageEmitPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.DidMessageEmitPayloadSchema  = {
	id: 'didMessageEmitPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'message': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: messageSchema,}
	            },
	            /** . */
	            'conversationState': {
	                type: 'text',
	                options: undefined
	            },
	            /** . */
	            'topic': {
	                type: 'text',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(didMessageEmitPayloadSchema)

export default didMessageEmitPayloadSchema
