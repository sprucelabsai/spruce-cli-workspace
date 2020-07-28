import { buildErrorDefinition } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

export default buildErrorDefinition({
	id: 'good',
	name: 'Good one',
	description: 'Another for testing',
	fields: {
		relatedSchema: {
			type: FieldType.Schema,
			label: 'Related schema',
			options: {
				schema: {
					id: 'nestedSchema',
					name: 'Nested Schema',
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
