import { buildSchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

export default buildSchema({
	id: 'syncSchemasAction',
	name: 'Sync schemas action',
	description:
		'Keep all your schemas and types in sync with your builders and contracts.',
	fields: {
		schemaTypesDestinationDir: {
			type: FieldType.Text,
			label: 'Schema types destination directory',
			hint: 'Where schema types and interfaces will be generated.',
			defaultValue: '#spruce/schemas',
		},
		fieldTypesDestinationDir: {
			type: FieldType.Text,
			label: 'Field types directory',
			hint: 'Where field types and interfaces will be generated.',
			defaultValue: '#spruce/schemas',
			isPrivate: true,
		},
		addonsLookupDir: {
			type: FieldType.Text,
			label: 'Id',
			hint: "Where I'll look for new schema fields to be registered.",
			defaultValue: 'src/addons',
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
		generateFieldTypes: {
			type: FieldType.Boolean,
			label: 'Generate field types',
			isPrivate: true,
			hint: 'Should I generate field types too?',
			defaultValue: true,
		},
	},
})
