import { SpruceSchemas } from '../../schemas.types'





const syncSchemasActionSchema: SpruceSchemas.SpruceCli.v2020_07_22.ISyncSchemasActionSchema  = {
	id: 'syncSchemasAction',
	name: 'Sync schemas action',
	description: 'Options for schema.sync.',
	    fields: {
	            /** Field types directory. Where field types and interfaces will be generated. */
	            'fieldTypesDestinationDir': {
	                label: 'Field types directory',
	                type: 'text',
	                isPrivate: true,
	                hint: 'Where field types and interfaces will be generated.',
	                defaultValue: "#spruce/schemas",
	                options: undefined
	            },
	            /** Addons lookup directory. Where I'll look for new schema fields to be registered. */
	            'addonsLookupDir': {
	                label: 'Addons lookup directory',
	                type: 'text',
	                hint: 'Where I\'ll look for new schema fields to be registered.',
	                defaultValue: "src/addons",
	                options: undefined
	            },
	            /** Generate field types. Should I generate field types too? */
	            'generateFieldTypes': {
	                label: 'Generate field types',
	                type: 'boolean',
	                isPrivate: true,
	                hint: 'Should I generate field types too?',
	                defaultValue: true,
	                options: undefined
	            },
	            /** Schema types destination directory. Where schema types and interfaces will be generated. */
	            'schemaTypesDestinationDir': {
	                label: 'Schema types destination directory',
	                type: 'text',
	                hint: 'Where schema types and interfaces will be generated.',
	                defaultValue: "#spruce/schemas",
	                options: undefined
	            },
	            /** . Where I should look for your schema builders? */
	            'schemaLookupDir': {
	                type: 'text',
	                hint: 'Where I should look for your schema builders?',
	                defaultValue: "src/schemas",
	                options: undefined
	            },
	            /** Enable versioning. */
	            'enableVersioning': {
	                label: 'Enable versioning',
	                type: 'boolean',
	                isPrivate: true,
	                defaultValue: true,
	                options: undefined
	            },
	            /** Global namespace. */
	            'globalNamespace': {
	                label: 'Global namespace',
	                type: 'text',
	                isPrivate: true,
	                options: undefined
	            },
	            /** Fetch remote schemas. I will check the server and your contracts to pull down schemas you need. */
	            'fetchRemoteSchemas': {
	                label: 'Fetch remote schemas',
	                type: 'boolean',
	                isPrivate: true,
	                hint: 'I will check the server and your contracts to pull down schemas you need.',
	                defaultValue: true,
	                options: undefined
	            },
	            /** Fetch local schemas. I will look in schemaLookupDir to load local schemas. */
	            'fetchLocalSchemas': {
	                label: 'Fetch local schemas',
	                type: 'boolean',
	                isPrivate: true,
	                hint: 'I will look in schemaLookupDir to load local schemas.',
	                defaultValue: true,
	                options: undefined
	            },
	            /** Fetch core schemas. */
	            'fetchCoreSchemas': {
	                label: 'Fetch core schemas',
	                type: 'boolean',
	                isPrivate: true,
	                defaultValue: true,
	                options: undefined
	            },
	            /** Generate core schemas. */
	            'generateCoreSchemaTypes': {
	                label: 'Generate core schemas',
	                type: 'boolean',
	                isPrivate: true,
	                defaultValue: false,
	                options: undefined
	            },
	            /** Delete directory if no schemas. */
	            'deleteDestinationDirIfNoSchemas': {
	                label: 'Delete directory if no schemas',
	                type: 'boolean',
	                isPrivate: true,
	                defaultValue: false,
	                options: undefined
	            },
	            /** Generate standalone types file. By default, I'll generate a types file that augments core types from @sprucelabs/spruce-core-schemas */
	            'generateStandaloneTypesFile': {
	                label: 'Generate standalone types file',
	                type: 'boolean',
	                isPrivate: true,
	                hint: 'By default, I\'ll generate a types file that augments core types from @sprucelabs/spruce-core-schemas',
	                defaultValue: false,
	                options: undefined
	            },
	    }
}

export default syncSchemasActionSchema
