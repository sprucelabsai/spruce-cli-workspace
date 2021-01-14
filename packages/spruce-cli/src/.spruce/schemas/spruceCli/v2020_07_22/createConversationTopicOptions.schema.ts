import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const createConversationTopicOptionsSchema: SpruceSchemas.SpruceCli.v2020_07_22.CreateConversationTopicOptionsSchema  = {
	id: 'createConversationTopicOptions',
	version: 'v2020_07_22',
	namespace: 'SpruceCli',
	name: 'Create conversation topic options',
	    fields: {
	            /** First Field. */
	            'fieldName1': {
	                label: 'First Field',
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	            /** Second Field. A hint */
	            'fieldName2': {
	                label: 'Second Field',
	                type: 'number',
	                isRequired: true,
	                hint: 'A hint',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(createConversationTopicOptionsSchema)

export default createConversationTopicOptionsSchema
