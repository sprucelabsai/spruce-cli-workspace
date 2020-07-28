import { buildErrorDefinition } from '@sprucelabs/schema'

export default buildErrorDefinition({
	id: 'good',
	name: 'Good one',
	description: 'Another for testing',
	fields: {
		textField: {
			//@ts-ignore
			// eslint-disable-next-line no-undef
			type: FieldType.Text,
			label: 'Example',
		},
	},
})
