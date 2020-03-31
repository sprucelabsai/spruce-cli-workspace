import { FieldType } from '@sprucelabs/schema'
import { buildErrorDefinition } from './types'

const invalidCommandDefinition = buildErrorDefinition({
	id: 'invalidCommand',
	name: 'Invalid command',
	fields: {
		args: {
			type: FieldType.Text,
			label: 'Args',
			isArray: true,
			isRequired: true,
			hint: 'The arguments the cli run with'
		}
	}
})

export default invalidCommandDefinition
