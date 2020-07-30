import { buildSchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

export default buildSchema({
	id: 'createTestAction',
	name: 'Create test action',
	description: 'Important: Start here!',
	fields: {
		type: {
			type: FieldType.Select,
			label: 'Type',
			isRequired: true,
			options: {
				choices: [
					{ value: 'behavioral', label: 'Behavioral' },
					{ value: 'implementation', label: 'Implementation' },
				],
			},
		},
		name: {
			type: FieldType.Text,
			label: 'What are you testing?',
			isRequired: true,
			hint: 'E.g. Booking an appointment or Turning on a light',
		},
	},
})
