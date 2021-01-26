import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const createConversationTopicOptionsSchema: SpruceSchemas.SpruceCli.v2020_07_22.CreateConversationTopicOptionsSchema  = {
	id: 'createConversationTopicOptions',
	version: 'v2020_07_22',
	namespace: 'SpruceCli',
	name: 'Define a topic you want to discuss.',
	    fields: {
	            /** Readable name. The name people will read */
	            'nameReadable': {
	                label: 'Readable name',
	                type: 'text',
	                isRequired: true,
	                hint: 'The name people will read',
	                options: undefined
	            },
	            /** Camel case name. camelCase version of the name */
	            'nameCamel': {
	                label: 'Camel case name',
	                type: 'text',
	                isRequired: true,
	                hint: 'camelCase version of the name',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(createConversationTopicOptionsSchema)

export default createConversationTopicOptionsSchema
