import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import getConversationTopicsTopicSchema from '#spruce/schemas/mercury/v2020_12_25/getConversationTopicsTopic.schema'

const getConversationTopicsResponsePayloadSchema: SpruceSchemas.Mercury.v2020_12_25.GetConversationTopicsResponsePayloadSchema  = {
	id: 'getConversationTopicsResponsePayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'topics': {
	                type: 'schema',
	                isRequired: true,
	                isArray: true,
	                options: {schema: getConversationTopicsTopicSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(getConversationTopicsResponsePayloadSchema)

export default getConversationTopicsResponsePayloadSchema
