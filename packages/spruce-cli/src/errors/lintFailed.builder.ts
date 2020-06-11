import { FieldType, buildErrorDefinition } from '@sprucelabs/schema'

const lintFailedDefinition = buildErrorDefinition({
	id: 'lintFailed',
	name: 'Lint failed!',
	description: 'When linting a file fails',
	fields: {
		pattern: {
			type: FieldType.Text,
			label: 'Pattern',
			hint: 'The pattern used to match files relative to the root of the skill',
			isRequired: true
		},
		stdout: {
			type: FieldType.Text,
			label: 'Output from lint',
			isRequired: true
		}
	}
})

export default lintFailedDefinition
