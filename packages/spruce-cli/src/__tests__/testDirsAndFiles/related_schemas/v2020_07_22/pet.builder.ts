import { buildSchemaDefinition } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

export default buildSchemaDefinition({
	id: 'pet',
	name: 'Pet',
	description: 'It is going to be great!',
	fields: {
		name: {
			type: FieldType.Text,
			isRequired: true,
		},
	},
})
