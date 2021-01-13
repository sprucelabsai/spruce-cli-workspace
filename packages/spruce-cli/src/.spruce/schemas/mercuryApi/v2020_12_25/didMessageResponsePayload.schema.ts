import { SchemaRegistry } from '@sprucelabs/schema'
import conversationTopicSchema from '#spruce/schemas/mercuryApi/v2020_12_25/conversationTopic.schema'
import { SpruceSchemas } from '../../schemas.types'

const didMessageResponsePayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.DidMessageResponsePayloadSchema = {
	id: 'didMessageResponsePayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	fields: {
		/** . */
		transitionConversationTo: {
			type: 'text',
			options: undefined,
		},
		/** . */
		suggestedTopics: {
			type: 'schema',
			isArray: true,
			options: { schema: conversationTopicSchema },
		},
	},
}

SchemaRegistry.getInstance().trackSchema(didMessageResponsePayloadSchema)

export default didMessageResponsePayloadSchema
