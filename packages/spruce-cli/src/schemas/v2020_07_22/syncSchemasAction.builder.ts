import { buildSchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import syncSchemaFieldsSchema from './syncSchemaFieldsAction.builder'

export default buildSchema({
	id: 'syncSchemasAction',
	name: 'Sync schemas action',
	description: 'Options for schema.sync.',
	fields: {
		...syncSchemaFieldsSchema.fields,
		schemaTypesDestinationDir: {
			type: FieldType.Text,
			label: 'Schema types destination directory',
			hint: 'Where schema types and interfaces will be generated.',
			defaultValue: '#spruce/schemas',
		},
		schemaLookupDir: {
			type: FieldType.Text,
			hint: 'Where I should look for your schema builders?',
			defaultValue: 'src/schemas',
		},
		enableVersioning: {
			type: FieldType.Boolean,
			defaultValue: true,
			label: 'Enable versioning',
			isPrivate: true,
		},
		globalNamespace: {
			type: FieldType.Text,
			label: 'Global namespace',
			isPrivate: true,
		},
		fetchRemoteSchemas: {
			type: FieldType.Boolean,
			label: 'Fetch remote schemas',
			isPrivate: true,
			hint:
				'I will check the server and your contracts to pull down schemas you need.',
			defaultValue: true,
		},
	},
})
