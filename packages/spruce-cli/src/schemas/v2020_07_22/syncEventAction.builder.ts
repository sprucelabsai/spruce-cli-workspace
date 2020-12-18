import { buildSchema } from '@sprucelabs/schema'
import syncSchemasActionBuilder from './syncSchemasAction.builder'

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
		schemaTypesLookupDir: {
			type: 'text',
			label: 'Schema types lookup directory',
			hint: 'Where I will lookup schema types and interfaces.',
			defaultValue:
				syncSchemasActionBuilder.fields.schemaTypesDestinationDirOrFile
					.defaultValue,
		},
	},
})
