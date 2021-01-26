import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import sendMessageMessagePayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/sendMessageMessagePayload.schema'

const sendMessageEmitPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.SendMessageEmitPayloadSchema  = {
	id: 'sendMessageEmitPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'message': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: sendMessageMessagePayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(sendMessageEmitPayloadSchema)

export default sendMessageEmitPayloadSchema
