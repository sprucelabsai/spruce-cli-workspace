import { buildErrorSchema } from '@sprucelabs/schema'

export default buildErrorSchema({
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
