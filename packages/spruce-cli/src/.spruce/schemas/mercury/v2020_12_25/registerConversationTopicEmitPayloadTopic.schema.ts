import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const registerConversationTopicEmitPayloadTopicSchema: SpruceSchemas.Mercury.v2020_12_25.RegisterConversationTopicEmitPayloadTopicSchema  = {
	id: 'registerConversationTopicEmitPayloadTopic',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** Key. A way to identify this topic, must be unique for your skill. */
	            'key': {
	                label: 'Key',
	                type: 'text',
	                isRequired: true,
	                hint: 'A way to identify this topic, must be unique for your skill.',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(registerConversationTopicEmitPayloadTopicSchema)

export default registerConversationTopicEmitPayloadTopicSchema
