import { buildErrorDefinition } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

export default buildErrorDefinition({
	id: 'testOne',
	name: 'Unit test one',
	description: 'For testing',
	fields: {
		textField: {
			type: FieldType.Text,
			label: 'Example'
		}
	}
})
