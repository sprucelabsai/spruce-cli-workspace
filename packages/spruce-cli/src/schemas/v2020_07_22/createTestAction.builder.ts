import { buildSchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import namedTemplateItemSchema from '#spruce/schemas/local/v2020_07_22/namedTemplateItem.schema'

export default buildSchema({
	id: 'createTestAction',
	name: 'Create test action',
	description: 'Options for creating a new test.',
	fields: {
		type: {
			type: FieldType.Select,
			label: 'Type',
			isRequired: true,
			options: {
				choices: [
					{ value: 'behavioral', label: 'Behavioral' },
					{ value: 'implementation', label: 'Implementation' },
				],
			},
		},
		nameReadable: {
			type: FieldType.Text,
			label: 'What are you testing?',
			isRequired: true,
			hint: 'E.g. Booking an appointment or turning on a light',
		},
		testDestinationDir: {
			type: FieldType.Text,
			label: 'Test destination directory',
			hint: "Where I'll save your new test.",
			defaultValue: 'src/__tests__',
		},
		nameCamel: namedTemplateItemSchema.fields.nameCamel,
		namePascal: namedTemplateItemSchema.fields.namePascal,
	},
})
