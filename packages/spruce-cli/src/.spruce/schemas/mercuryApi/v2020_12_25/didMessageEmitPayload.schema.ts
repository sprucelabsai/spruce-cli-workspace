import { SchemaRegistry } from '@sprucelabs/schema'
import messageSchema from '#spruce/schemas/mercuryApi/v2020_12_25/message.schema'
import { SpruceSchemas } from '../../schemas.types'

const didMessageEmitPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.DidMessageEmitPayloadSchema = {
	id: 'didMessageEmitPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	fields: {
		/** . */
		message: {
			type: 'schema',
			isRequired: true,
			options: { schema: messageSchema },
		},
		/** . */
		conversationState: {
			type: 'text',
			options: undefined,
		},
		/** . */
		topic: {
			type: 'text',
			options: undefined,
		},
	},
}

SchemaRegistry.getInstance().trackSchema(didMessageEmitPayloadSchema)

export default didMessageEmitPayloadSchema
