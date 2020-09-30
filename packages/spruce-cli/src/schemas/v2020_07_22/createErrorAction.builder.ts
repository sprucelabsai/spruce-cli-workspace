import { buildSchema } from '@sprucelabs/schema'
import namedTemplateItemBuilder from './namedTemplateItem.builder'
import syncErrorsActionBuilder from './syncErrorsAction.builder'

export default buildSchema({
	id: 'createErrorAction',
	name: 'Create error action',
	description: 'Create a builder for your brand new error! ',
	fields: {
		...syncErrorsActionBuilder.fields,
		errorBuilderDestinationDir: {
			type: 'text',
			label: 'Error builder destination directory',
			isRequired: true,
			hint: "Where I'll save your new builder file?",
			defaultValue: './src/errors',
		},
		nameReadable: namedTemplateItemBuilder.fields.nameReadable,
		namePascal: namedTemplateItemBuilder.fields.namePascal,
		nameCamel: namedTemplateItemBuilder.fields.nameCamel,
		description: namedTemplateItemBuilder.fields.description,
	},
})
