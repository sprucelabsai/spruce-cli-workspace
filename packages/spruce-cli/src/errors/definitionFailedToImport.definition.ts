import { FieldType } from '@sprucelabs/schema'

import { buildErrorDefinition } from '@sprucelabs/error'

const definitionFailedToImportDefinition = buildErrorDefinition({
	id: 'definitionFailedToImport',
	name: 'Definition failed to import',
	description: 'The definition file failed to import',
	fields: {
		file: {
			type: FieldType.Text,
			label: 'File',
			isRequired: true,
			hint: 'The file definition file I tried to import'
		},
		details: {
			type: FieldType.Text,
			label: 'Details',
			isRequired: true,
			hint: 'Additional context'
		}
	}
})

export default definitionFailedToImportDefinition
