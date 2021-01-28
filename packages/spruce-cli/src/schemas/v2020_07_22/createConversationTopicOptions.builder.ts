import { buildSchema } from '@sprucelabs/schema'
import namedTemplateItemBuilder from './namedTemplateItem.builder'

export default buildSchema({
	id: 'createConversationTopicOptions',
	name: 'Define a topic you want to discuss.',
	description: '',
	fields: {
		nameReadable: {
			...namedTemplateItemBuilder.fields.nameReadable,
			label: 'Topic',
			hint:
				'What should we talk about or try and get done, e.g. Book an appointment or tell a knock knock joke.',
		},
		nameCamel: namedTemplateItemBuilder.fields.nameCamel,
	},
})
