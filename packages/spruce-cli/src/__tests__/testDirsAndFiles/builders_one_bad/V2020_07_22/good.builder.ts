import { buildErrorSchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

export default buildErrorSchema({
	id: 'good',
	name: 'Good one',
	description: 'Another for testing',
	fields: {
		textField: {
			type: FieldType.Text,
			label: 'Example',
		},
	},
})
