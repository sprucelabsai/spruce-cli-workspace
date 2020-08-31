import { buildSchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

export default buildSchema({
	id: 'food',
	name: 'Food',
	description: 'It is going to be yummy!',
	fields: {
		name: {
			type: FieldType.Text,
			isRequired: true,
		},
	},
})
