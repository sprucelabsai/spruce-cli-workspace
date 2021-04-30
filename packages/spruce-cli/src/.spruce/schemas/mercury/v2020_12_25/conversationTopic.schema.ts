import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const conversationTopicSchema: SpruceSchemas.Mercury.v2020_12_25.ConversationTopicSchema  = {
	id: 'conversationTopic',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'key': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'confidence': {
	                type: 'number',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'label': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(conversationTopicSchema)

export default conversationTopicSchema
