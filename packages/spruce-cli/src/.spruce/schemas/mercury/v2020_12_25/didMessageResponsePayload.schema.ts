import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import conversationTopicSchema from '#spruce/schemas/mercury/v2020_12_25/conversationTopic.schema'

const didMessageResponsePayloadSchema: SpruceSchemas.Mercury.v2020_12_25.DidMessageResponsePayloadSchema  = {
	id: 'didMessageResponsePayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'transitionConversationTo': {
	                type: 'select',
	                options: {choices: [{"label":"Greeting","value":"greeting"},{"label":"Discovery","value":"discovery"},{"label":"Topic","value":"topic"},{"label":"Closing","value":"closing"}],}
	            },
	            /** . */
	            'repairs': {
	                type: 'text',
	                isArray: true,
	                options: undefined
	            },
	            /** . */
	            'topicChangers': {
	                type: 'text',
	                isArray: true,
	                options: undefined
	            },
	            /** . */
	            'utterance': {
	                type: 'text',
	                options: undefined
	            },
	            /** . */
	            'suggestedTopics': {
	                type: 'schema',
	                isArray: true,
	                options: {schema: conversationTopicSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(didMessageResponsePayloadSchema)

export default didMessageResponsePayloadSchema
