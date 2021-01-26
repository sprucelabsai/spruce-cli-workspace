import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import eventTargetSchema from '#spruce/schemas/mercuryApi/v2020_12_25/eventTarget.schema'
import sendMessageEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/sendMessageEmitPayload.schema'

const sendMessageEmitTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.SendMessageEmitTargetAndPayloadSchema  = {
	id: 'sendMessageEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
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
