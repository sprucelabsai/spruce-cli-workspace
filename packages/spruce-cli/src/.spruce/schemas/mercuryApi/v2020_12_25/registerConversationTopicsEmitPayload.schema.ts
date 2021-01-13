import { SchemaRegistry } from '@sprucelabs/schema'
import registerConversationTopicEmitPayloadTopicSchema from '#spruce/schemas/mercuryApi/v2020_12_25/registerConversationTopicEmitPayloadTopic.schema'
import { SpruceSchemas } from '../../schemas.types'

const registerConversationTopicsEmitPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.RegisterConversationTopicsEmitPayloadSchema = {
	id: 'registerConversationTopicsEmitPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	fields: {
		/** . */
		topics: {
			type: 'schema',
			isRequired: true,
			isArray: true,
			options: { schema: registerConversationTopicEmitPayloadTopicSchema },
		},
	},
}

SchemaRegistry.getInstance().trackSchema(
	registerConversationTopicsEmitPayloadSchema
)

export default registerConversationTopicsEmitPayloadSchema
