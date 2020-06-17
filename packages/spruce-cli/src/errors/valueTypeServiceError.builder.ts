import { buildErrorDefinition } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldType'

const valueTypeServiceErrorDefinition = buildErrorDefinition({
	id: 'valueTypeServiceError',
	name: 'Value type service error',
	description: 'An error when generating value types for template insertion ',
	fields: {
		schemaId: {
			type: FieldType.Text,
			label: 'Schema id',
			isRequired: true
		}
	}
})

export default valueTypeServiceErrorDefinition
