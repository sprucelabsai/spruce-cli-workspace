import { buildSchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import errorSyncActionSchema from '#spruce/schemas/local/v2020_07_22/errorSyncAction.schema'
import namedTemplateItemSchema from '#spruce/schemas/local/v2020_07_22/namedTemplateItem.schema'

export default buildSchema({
	id: 'createErrorAction',
	name: 'Create error action',
	description: 'Create a builder for your brand new error! ',
	fields: {
		...errorSyncActionSchema.fields,
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
