import { FieldType, buildErrorDefinition } from '@sprucelabs/schema'

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
		},
		details: {
			type: FieldType.Text,
			label: 'Details',
			isRequired: true,
			hint: 'Additional details'
		}
	}
})

export default failedToImportDefinition
