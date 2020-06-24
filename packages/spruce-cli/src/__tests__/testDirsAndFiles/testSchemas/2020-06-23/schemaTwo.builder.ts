import { buildSchemaDefinition } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldType'

export default buildSchemaDefinition({
	id: 'schemaTwo',
	name: 'Second schema',
	description: 'It is going to be greater, I thin!',
	fields: {
		phone: {
			type: FieldType.Phone,
			isRequired: true
		}
	}
})
