import { buildErrorDefinition } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldType'

const failedToImportDefinition = buildErrorDefinition({
	id: 'failedToImport',
	name: 'FailedToImport',
	description: 'Failed to import a file through VM',
	fields: {
		file: {
			type: FieldType.Text,
			label: 'File',
			isRequired: true,
			hint: 'The file I tried to import'
		}
	}
})

export default failedToImportDefinition
