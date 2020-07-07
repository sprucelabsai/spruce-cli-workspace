import { buildErrorDefinition } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

export default buildErrorDefinition({
	id: 'testTwo',
	name: 'Unit test two',
	description: 'Another for testing',
	fields: {
		textField: {
			type: FieldType.Text,
			label: 'Example',
		},
	},
})
