import { buildErrorDefinition } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

export default buildErrorDefinition({
	id: 'commandNotImplemented',
	name: 'Command not implemented',
	description: 'This command has not yet been implemented ',
	fields: {
		command: {
			type: FieldType.Text,
			label: 'Command',
			isRequired: true,
			hint: 'the command being run!'
		},
		args: {
			type: FieldType.Text,
			label: 'Args',
			isRequired: false,
			isArray: true,
			hint: 'Arguments passed to the command'
		}
	}
})
