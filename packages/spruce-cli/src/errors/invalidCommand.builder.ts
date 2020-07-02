import { buildErrorDefinition } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

const invalidParamsDefinition = buildErrorDefinition({
	id: 'invalidCommand',
	name: 'Invalid command',
	description: 'The command is not valid, try --help',
	fields: {
		args: {
			type: FieldType.Text,
			label: 'args',
			isArray: true,
			isRequired: true
		}
	}
})

export default invalidParamsDefinition
