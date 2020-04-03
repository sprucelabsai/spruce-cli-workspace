import { FieldType, buildErrorDefinition } from '@sprucelabs/schema'

const notImplementedDefinition = buildErrorDefinition({
	id: 'notImplemented',
	name: 'Not implemented',
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

export default notImplementedDefinition
