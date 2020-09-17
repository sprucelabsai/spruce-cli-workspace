import { buildSchema } from '@sprucelabs/schema'
import syncSchemaFieldsSchema from './syncSchemaFieldsAction.builder'

export default buildSchema({
	id: 'syncSchemasAction',
	name: 'Sync schemas action',
	description: 'Options for schema.sync.',
	fields: {
		...syncSchemaFieldsSchema.fields,
		schemaTypesDestinationDir: {
			type: 'text',
			label: 'Schema types destination directory',
			hint: 'Where schema types and interfaces will be generated.',
			defaultValue: '#spruce/schemas',
		},
		schemaLookupDir: {
			type: 'text',
			hint: 'Where I should look for your schema builders?',
			defaultValue: 'src/schemas',
		},
		enableVersioning: {
			type: 'boolean',
			defaultValue: true,
			label: 'Enable versioning',
			isPrivate: true,
		},
		globalNamespace: {
			type: 'text',
			label: 'Global namespace',
			isPrivate: true,
		},
		fetchRemoteSchemas: {
			type: 'boolean',
			label: 'Fetch remote schemas',
			isPrivate: true,
			hint:
				'I will check the server and your contracts to pull down schemas you need.',
			defaultValue: true,
		},
	},
})
