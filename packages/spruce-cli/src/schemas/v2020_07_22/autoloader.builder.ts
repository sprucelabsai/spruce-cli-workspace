import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
	id: 'autoloader',
	name: 'Autoloader',
	description: 'A directory that is autoloaded.',
	fields: {
		lookupDir: {
			type: 'directory',
			label: 'Source directory',
			isRequired: true,
		},
		destination: {
			type: 'file',
			label: 'Destination',
			hint: 'Where the file that does the autoloading is written',
			isRequired: true,
		},
		pattern: {
			type: 'text',
			label: 'Pattern',
			defaultValue: '**/!(*.test).ts',
			isRequired: true,
		},
	},
})
