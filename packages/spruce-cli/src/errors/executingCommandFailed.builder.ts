import { buildSchemaDefinition, FieldType } from '@sprucelabs/schema'

export default buildSchemaDefinition({
	id: 'executingCommandFailed',
	name: 'Executing command failed',
	description: 'The command that was being executed failed',
	fields: {
		cmd: {
			type: FieldType.Text,
			label: 'The command being run',
			isRequired: true
		},
		args: {
			type: FieldType.Text,
			label: 'Args',
			isArray: true
		},
		cwd: {
			type: FieldType.Text,
			label: 'Cwd'
		}
	}
})
