import { buildSchemaDefinition } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldType'
export default buildSchemaDefinition({
	id: 'autoloader',
	name: 'Autoloader',
	description: 'A directory that is autoloaded',
	fields: {
		lookupDir: {
			type: FieldType.Directory,
			label: 'Source directory',
			isRequired: true
		},
		destination: {
			type: FieldType.File,
			label: 'Destination',
			hint: 'Where the file that does the autoloading is written',
			isRequired: true
		},
		pattern: {
			type: FieldType.Text,
			label: 'Pattern',
			defaultValue: '**/!(*.test).ts',
			isRequired: true
		}
	}
})
