import { buildSchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

export default buildSchema({
	id: 'syncSchemaFieldsAction',
	name: 'syncSchemaFieldsAction',
	description: 'Sync schema fields so you can use schemas!',
	fields: {
		fieldTypesDestinationDir: {
			type: FieldType.Text,
			label: 'Field types directory',
			hint: 'Where field types and interfaces will be generated.',
			defaultValue: '#spruce/schemas',
			isPrivate: true,
		},
		addonsLookupDir: {
			type: FieldType.Text,
			label: 'Id',
			hint: "Where I'll look for new schema fields to be registered.",
			defaultValue: 'src/addons',
		},
		generateFieldTypes: {
			type: FieldType.Boolean,
			label: 'Generate field types',
			isPrivate: true,
			hint: 'Should I generate field types too?',
			defaultValue: true,
		},
	},
})
