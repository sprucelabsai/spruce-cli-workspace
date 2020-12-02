import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
	id: 'syncEventAction',
	name: 'sync event action',
	description: '',
	fields: {
		contractDestinationFile: {
			type: 'text',
			label: 'Contract destination',
			hint: 'Where I will generate event contract.',
			defaultValue: '#spruce/events/events.contract.ts',
		},
	},
})
