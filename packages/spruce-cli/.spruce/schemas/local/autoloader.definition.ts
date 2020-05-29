import * as SpruceSchema from '@sprucelabs/schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'

const autoloaderDefinition: SpruceSchemas.Local.Autoloader.IDefinition = {
	id: 'autoloader',
	name: 'Autoloader',
	description: 'A directory that is autoloaded',

	fields: {
		/** Source directory. */
		lookupDir: {
			label: 'Source directory',
			type: SpruceSchema.FieldType.Directory,

			isRequired: true,

			options: undefined
		},
		/** Destination. Where the file that does the autoloading is written */
		destination: {
			label: 'Destination',
			type: SpruceSchema.FieldType.File,

			isRequired: true,
			hint: 'Where the file that does the autoloading is written',

			options: undefined
		},
		/** Pattern. */
		pattern: {
			label: 'Pattern',
			type: SpruceSchema.FieldType.Text,

			isRequired: true,

			defaultValue: '**/!(*.test).ts',

			options: undefined
		}
	}
}

export default autoloaderDefinition
