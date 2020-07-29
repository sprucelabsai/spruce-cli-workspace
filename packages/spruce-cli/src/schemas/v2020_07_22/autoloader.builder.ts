import { buildSchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
export default buildSchema({
	id: 'autoloader',
	name: 'Autoloader',
	description: 'A directory that is autoloaded',
	fields: {
		lookupDir: {
			type: FieldType.Directory,
			label: 'Source directory',
			isRequired: true,
		},
		destination: {
			type: FieldType.File,
			label: 'Destination',
			hint: 'Where the file that does the autoloading is written',
			isRequired: true,
		},
		pattern: {
			type: FieldType.Text,
			label: 'Pattern',
			defaultValue: '**/!(*.test).ts',
			isRequired: true,
		},
	},
})
