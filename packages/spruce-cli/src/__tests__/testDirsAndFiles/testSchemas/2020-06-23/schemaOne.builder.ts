import { buildSchemaDefinition } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldType'

export default buildSchemaDefinition({
	id: 'schemaOne',
	name: 'First schema',
	description: 'It is going to be great!',
	fields: {
		name: {
			type: FieldType.Text,
			isRequired: true
		}
	}
})
