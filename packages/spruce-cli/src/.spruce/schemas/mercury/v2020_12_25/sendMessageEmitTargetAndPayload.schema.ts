import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import eventTargetSchema from '#spruce/schemas/mercury/v2020_12_25/eventTarget.schema'
import sendMessageEmitPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/sendMessageEmitPayload.schema'

const sendMessageEmitTargetAndPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.SendMessageEmitTargetAndPayloadSchema  = {
	id: 'sendMessageEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'target': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: eventTargetSchema,}
	            },
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: sendMessageEmitPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(sendMessageEmitTargetAndPayloadSchema)

export default sendMessageEmitTargetAndPayloadSchema
