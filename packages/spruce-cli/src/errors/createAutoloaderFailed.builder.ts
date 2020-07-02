import { buildErrorDefinition } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

export default buildErrorDefinition({
	id: 'createAutoloaderFailed',
	name: 'Could not create an autoloader',
	description: 'Autoloader creation failed',
	fields: {
		globbyPattern: {
			type: FieldType.Text,
			label: 'The globby pattern used to find files',
			isRequired: true,
			hint: 'Globby pattern'
		},
		filePaths: {
			type: FieldType.Text,
			label: 'The files that were loaded',
			isArray: true,
			isRequired: true,
			hint: 'The files that were loaded'
		},
		suffix: {
			type: FieldType.Text,
			label: 'The suffix for classes to autoload',
			isRequired: true,
			hint: 'Class suffix'
		},
		directory: {
			type: FieldType.Text,
			label: "The directory we're trying to create the autoloader for",
			isRequired: true,
			hint: 'Directory to autoload'
		}
	}
})
