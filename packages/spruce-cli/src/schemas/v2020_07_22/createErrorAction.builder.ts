import { buildSchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import namedTemplateItemSchema from '#spruce/schemas/local/v2020_07_22/namedTemplateItem.schema'
import syncErrorActionSchema from '#spruce/schemas/local/v2020_07_22/syncErrorAction.schema'

export default buildSchema({
	id: 'createErrorAction',
	name: 'Create error action',
	description: 'Create a builder for your brand new error! ',
	fields: {
		...syncErrorActionSchema.fields,
		errorBuilderDestinationDir: {
			type: FieldType.Text,
			label: 'Error builder destination directory',
			isRequired: true,
			hint: "Where I'll save your new builder file?",
			defaultValue: './src/errors',
		},
		nameReadable: namedTemplateItemSchema.fields.nameReadable,
		namePascal: namedTemplateItemSchema.fields.namePascal,
		nameCamel: namedTemplateItemSchema.fields.nameCamel,
		description: namedTemplateItemSchema.fields.description,
	},
})
