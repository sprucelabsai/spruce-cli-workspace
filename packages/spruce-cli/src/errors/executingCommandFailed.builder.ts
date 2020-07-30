import { buildSchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

export default buildSchema({
	id: 'executingCommandFailed',
	name: 'Executing command failed',
	description: 'The command that was being executed failed',
	fields: {
		cmd: {
			type: FieldType.Text,
			label: 'The command being run',
			isRequired: true,
		},
		args: {
			type: FieldType.Text,
			label: 'Args',
			isArray: true,
		},
		cwd: {
			type: FieldType.Text,
			label: 'Cwd',
		},
		stdout: {
			type: FieldType.Text,
			label: 'Stdout',
		},
		stderr: {
			type: FieldType.Text,
			label: 'stderr',
		},
	},
})
