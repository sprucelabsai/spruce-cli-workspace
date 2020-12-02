import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
	id: 'syncEventAction',
	name: 'sync event action',
	description: '',
	fields: {
		contractDestinationDir: {
			type: 'text',
			label: 'Contract destination',
			hint: 'Where I will generate event contracts.',
			defaultValue: '#spruce/events',
		},
	},
})
