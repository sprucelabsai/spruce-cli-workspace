import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import sendMessageTargetPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/sendMessageTargetPayload.schema'
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
	                options: {schema: sendMessageTargetPayloadSchema,}
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
