import { buildErrorDefinition } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldType'

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
