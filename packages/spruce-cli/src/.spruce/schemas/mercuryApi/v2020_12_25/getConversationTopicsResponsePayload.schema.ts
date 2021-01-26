import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import getConversationTopicsTopicSchema from '#spruce/schemas/mercuryApi/v2020_12_25/getConversationTopicsTopic.schema'

const getConversationTopicsResponsePayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.GetConversationTopicsResponsePayloadSchema  = {
	id: 'getConversationTopicsResponsePayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
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
