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
	            /** Id. Where I'll look for new schema fields to be registered. */
	            'addonsLookupDir': {
	                label: 'Id',
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
	            'fetchLocalSchemas': {
	                label: 'Fetch local schemas',
	                type: 'boolean',
	                isPrivate: true,
	                hint: 'I will check the server and your contracts to pull down schemas you need.',
	                defaultValue: true,
	                options: undefined
	            },
	            'generateCoreSchemaTypes': {
	                label: 'Fetch remote schemas',
	                type: 'boolean',
	                hint: 'I will check the server and your contracts to pull down schemas you need.',
	                defaultValue: false,
	                options: undefined
				},
				fetchCoreSchemas: {
					type: 'boolean',
					label: 'Fetch core schemas',
					isPrivate: true,
					defaultValue: true,
				},
				generateStandaloneTypesFile: {
					type: 'boolean',
					label: 'Generate standalone types file',
					isPrivate: true,
					hint: `By default, I'll generate a types file that augments core types from @sprucelabs/spruce-core-schemas`,
					defaultValue: false,
				},
				deleteDestinationDirIfNoSchemas: {
					type: 'boolean',
					label: 'Delete directory if no schemas',
					isPrivate: true,
					defaultValue: false,
				}
	    }
}

export default syncSchemasActionSchema
