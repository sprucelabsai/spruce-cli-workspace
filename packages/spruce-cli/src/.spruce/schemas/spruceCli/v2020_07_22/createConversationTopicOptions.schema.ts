import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const createConversationTopicOptionsSchema: SpruceSchemas.SpruceCli.v2020_07_22.CreateConversationTopicOptionsSchema  = {
	id: 'createConversationTopicOptions',
	version: 'v2020_07_22',
	namespace: 'SpruceCli',
	name: 'Create conversation topic options',
	    fields: {
	    }
}

SchemaRegistry.getInstance().trackSchema(createConversationTopicOptionsSchema)

export default createConversationTopicOptionsSchema
