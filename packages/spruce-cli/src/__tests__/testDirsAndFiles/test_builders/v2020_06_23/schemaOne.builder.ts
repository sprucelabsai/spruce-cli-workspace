import { buildSchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

export default buildSchema({
	id: 'schemaOne',
	name: 'First schema',
	description: 'It is going to be great!',
	fields: {
		name: {
			type: FieldType.Text,
			isRequired: true,
		},
	},
})
