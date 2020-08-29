import { buildSchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

export default buildSchema({
	id: 'testPerson',
	name: 'test person',
	description: 'It is going to be great!',
	fields: {
		name: {
			type: FieldType.Text,
			isRequired: true,
		},
		pet: {
			type: FieldType.Schema,
			options: {
				schemaId: { id: 'pet', version: 'v2020_07_22' },
			},
		},
		nestedSchema: {
			type: FieldType.Schema,
			options: {
				schema: {
					id: 'nested-schema',
					name: 'nested schema',
					fields: {
						field1: {
							type: FieldType.Text,
						},
						field2: {
							type: FieldType.Text,
						},
					},
				},
			},
		},
	},
})
