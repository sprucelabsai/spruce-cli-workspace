import { buildSchema } from '@sprucelabs/schema'
import syncSchemaFieldsActionBuilder from './syncSchemaFieldsAction.builder'

export default buildSchema({
	id: 'syncEventAction',
	name: 'sync event action',
	description: '',
	fields: {
		addonsLookupDir: syncSchemaFieldsActionBuilder.fields.addonsLookupDir,
		contractDestinationDir: {
			type: 'text',
			label: 'Contract destination',
			hint: 'Where I will generate event contracts.',
			defaultValue: '#spruce/events',
		},
	},
})
