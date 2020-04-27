import { FieldType, buildErrorDefinition } from '@sprucelabs/schema'

const valueTypeServiceErrorDefinition = buildErrorDefinition({
	id: 'valueTypeServiceError',
	name: 'Value type service error',
	description: 'Ar error when generating value types for template insertion ',
	fields: {
		schemaId: {
			type: FieldType.Text,
			label: 'Schema id',
			isRequired: true
		}
	}
})

export default valueTypeServiceErrorDefinition
