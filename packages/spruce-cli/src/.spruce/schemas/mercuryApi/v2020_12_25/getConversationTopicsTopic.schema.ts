import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const getConversationTopicsTopicSchema: SpruceSchemas.MercuryApi.v2020_12_25.GetConversationTopicsTopicSchema  = {
	id: 'getConversationTopicsTopic',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'key': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(getConversationTopicsTopicSchema)

export default getConversationTopicsTopicSchema
