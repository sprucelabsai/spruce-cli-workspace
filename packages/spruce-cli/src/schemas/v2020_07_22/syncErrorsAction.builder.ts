import { buildSchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import syncSchemasActionSchema from '#spruce/schemas/local/v2020_07_22/syncSchemasAction.schema'

export default buildSchema({
	id: 'syncErrorAction',
	name: 'Sync error action',
	description: 'Keep your errors types in sync with your builders',
	fields: {
		addonsLookupDir: syncSchemasActionSchema.fields.addonsLookupDir,
		errorClassDestinationDir: {
			type: FieldType.Text,
			label: 'Error class destination',
			isRequired: true,
			hint: "Where I'll save your new Error class file?",
			defaultValue: 'src/errors',
		},
		errorLookupDir: {
			type: FieldType.Text,
			hint: 'Where I should look for your error builders?',
			defaultValue: 'src/errors',
		},
		errorTypesDestinationDir: {
			type: FieldType.Text,
			label: 'Types destination dir',
			hint: 'This is where error options and type information will be written',
			defaultValue: '#spruce/errors',
		},
	},
})
