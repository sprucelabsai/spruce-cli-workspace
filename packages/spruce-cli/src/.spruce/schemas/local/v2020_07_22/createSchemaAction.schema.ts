import { SpruceSchemas } from '../../schemas.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'



const createSchemaActionSchema: SpruceSchemas.Local.v2020_07_22.ICreateSchemaActionSchema  = {
	id: 'createSchemaAction',
	name: 'Create schema action',
	description: 'Create the builder to a fresh new schema!',
	    fields: {
	            /** Schema types destination directory. Where schema types and interfaces will be generated. */
	            'schemaTypesDestinationDir': {
	                label: 'Schema types destination directory',
	                type: FieldType.Text,
	                hint: 'Where schema types and interfaces will be generated.',
	                defaultValue: "#spruce/schemas",
	                options: undefined
	            },
	            /** Field types directory. Where field types and interfaces will be generated. */
	            'fieldTypesDestinationDir': {
	                label: 'Field types directory',
	                type: FieldType.Text,
	                isPrivate: true,
	                hint: 'Where field types and interfaces will be generated.',
	                defaultValue: "#spruce/schemas",
	                options: undefined
	            },
	            /** Id. Where I'll look for new schema fields to be registered. */
	            'addonsLookupDir': {
	                label: 'Id',
	                type: FieldType.Text,
	                hint: 'Where I\'ll look for new schema fields to be registered.',
	                defaultValue: "src/addons",
	                options: undefined
	            },
	            /** . Where I should look for your schema builders? */
	            'schemaLookupDir': {
	                type: FieldType.Text,
	                hint: 'Where I should look for your schema builders?',
	                defaultValue: "src/schemas",
	                options: undefined
	            },
	            /** Enable versioning. */
	            'enableVersioning': {
	                label: 'Enable versioning',
	                type: FieldType.Boolean,
	                isPrivate: true,
	                defaultValue: true,
	                options: undefined
	            },
	            /** Global namespace. */
	            'globalNamespace': {
	                label: 'Global namespace',
	                type: FieldType.Text,
	                isPrivate: true,
	                options: undefined
	            },
	            /** Fetch remote schemas. I will check the server and your contracts to pull down schemas you need. */
	            'fetchRemoteSchemas': {
	                label: 'Fetch remote schemas',
	                type: FieldType.Boolean,
	                isPrivate: true,
	                hint: 'I will check the server and your contracts to pull down schemas you need.',
	                defaultValue: true,
	                options: undefined
	            },
	            /** Generate field types. Should I generate field types too? */
	            'generateFieldTypes': {
	                label: 'Generate field types',
	                type: FieldType.Boolean,
	                isPrivate: true,
	                hint: 'Should I generate field types too?',
	                defaultValue: true,
	                options: undefined
	            },
	            /** Schema builder destination directory. Where I'll save the new schema builder. */
	            'schemaBuilderDestinationDir': {
	                label: 'Schema builder destination directory',
	                type: FieldType.Text,
	                hint: 'Where I\'ll save the new schema builder.',
	                defaultValue: "src/schemas",
	                options: undefined
	            },
	            /** Builder function. The function that builds this schema */
	            'builderFunction': {
	                label: 'Builder function',
	                type: FieldType.Text,
	                isPrivate: true,
	                hint: 'The function that builds this schema',
	                defaultValue: "buildSchema",
	                options: undefined
	            },
	            /** Sync after creation. This will ensure types and schemas are in sync after you create your builder. */
	            'syncAfterCreate': {
	                label: 'Sync after creation',
	                type: FieldType.Boolean,
	                isPrivate: true,
	                hint: 'This will ensure types and schemas are in sync after you create your builder.',
	                defaultValue: true,
	                options: undefined
	            },
	            /** Version. Set a version yourself instead of letting me generate one for you */
	            'version': {
	                label: 'Version',
	                type: FieldType.Text,
	                isPrivate: true,
	                hint: 'Set a version yourself instead of letting me generate one for you',
	                options: undefined
	            },
	            /** Readable name. The name people will read */
	            'nameReadable': {
	                label: 'Readable name',
	                type: FieldType.Text,
	                hint: 'The name people will read',
	                options: undefined
	            },
	            /** Pascal case name. PascalCase of the name */
	            'namePascal': {
	                label: 'Pascal case name',
	                type: FieldType.Text,
	                hint: 'PascalCase of the name',
	                options: undefined
	            },
	            /** Camel case name. camelCase version of the name */
	            'nameCamel': {
	                label: 'Camel case name',
	                type: FieldType.Text,
	                isRequired: true,
	                hint: 'camelCase version of the name',
	                options: undefined
	            },
	            /** Description. Describe a bit more here */
	            'description': {
	                label: 'Description',
	                type: FieldType.Text,
	                hint: 'Describe a bit more here',
	                options: undefined
	            },
	    }
}

export default createSchemaActionSchema
