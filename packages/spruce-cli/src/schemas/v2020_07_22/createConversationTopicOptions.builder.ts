import { buildSchema } from '@sprucelabs/schema'
import namedTemplateItemBuilder from './namedTemplateItem.builder'

export default buildSchema({
	id: 'createConversationTopicOptions',
	name: 'Define a topic you want to discuss.',
	description: '',
	fields: {
		nameReadable: namedTemplateItemBuilder.fields.nameReadable,
		nameCamel: namedTemplateItemBuilder.fields.nameCamel,
	},
})
