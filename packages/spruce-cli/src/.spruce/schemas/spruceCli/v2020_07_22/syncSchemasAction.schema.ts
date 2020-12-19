import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const syncSchemasActionSchema: SpruceSchemas.SpruceCli.v2020_07_22.SyncSchemasActionSchema  = {
	id: 'syncSchemasAction',
	version: 'v2020_07_22',
	namespace: 'SpruceCli',
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
	            /** Schema types destination directory. Where I will generate schema types and interfaces. */
	            'schemaTypesDestinationDirOrFile': {
	                label: 'Schema types destination directory',
	                type: 'text',
	                hint: 'Where I will generate schema types and interfaces.',
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
	            /** Enable versioning. Should we use versioning? */
	            'enableVersioning': {
	                label: 'Enable versioning',
	                type: 'boolean',
	                isPrivate: true,
	                hint: 'Should we use versioning?',
	                defaultValue: true,
	                options: undefined
	            },
	            /** Global namespace. The name you'll use when accessing these schemas, e.g. SpruceSchemas */
	            'globalSchemaNamespace': {
	                label: 'Global namespace',
	                type: 'text',
	                isPrivate: true,
	                hint: 'The name you\'ll use when accessing these schemas, e.g. SpruceSchemas',
	                defaultValue: "SpruceSchemas",
	                options: undefined
	            },
	            /** Fetch remote schemas. I will pull in schemas from other features. */
	            'fetchRemoteSchemas': {
	                label: 'Fetch remote schemas',
	                type: 'boolean',
	                isPrivate: true,
	                hint: 'I will pull in schemas from other features.',
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
	            /** Fetch core schemas. Should I pull in core schemas too? */
	            'fetchCoreSchemas': {
	                label: 'Fetch core schemas',
	                type: 'boolean',
	                isPrivate: true,
	                hint: 'Should I pull in core schemas too?',
	                defaultValue: true,
	                options: undefined
	            },
	            /** Generate core schemas. Used only for updating the @sprucelabs/spruce-core-schemas. Ensures core schemas are generated like local schemas. Also an alias for `--fetchRemoteSchemas=false --fetchCoreSchemas=false --generateStandaloneTypesFile. */
	            'generateCoreSchemaTypes': {
	                label: 'Generate core schemas',
	                type: 'boolean',
	                isPrivate: true,
	                hint: 'Used only for updating the @sprucelabs/spruce-core-schemas. Ensures core schemas are generated like local schemas. Also an alias for `--fetchRemoteSchemas=false --fetchCoreSchemas=false --generateStandaloneTypesFile.',
	                defaultValue: false,
	                options: undefined
	            },
	            /** Register built schemas. Should the schemas use the SchemaRegistry for tracking? */
	            'registerBuiltSchemas': {
	                label: 'Register built schemas',
	                type: 'boolean',
	                isPrivate: true,
	                hint: 'Should the schemas use the SchemaRegistry for tracking?',
	                defaultValue: true,
	                options: undefined
	            },
	            /** Delete directory if no schemas. Should I delete the schema directory if no schemas are found? */
	            'deleteDestinationDirIfNoSchemas': {
	                label: 'Delete directory if no schemas',
	                type: 'boolean',
	                isPrivate: true,
	                hint: 'Should I delete the schema directory if no schemas are found?',
	                defaultValue: false,
	                options: undefined
	            },
	            /** Generate standalone types file. By default, I'll generate a types file that augments core types from @sprucelabs/spruce-core-schemas. Setting this to true will generate a stand alone types file. */
	            'generateStandaloneTypesFile': {
	                label: 'Generate standalone types file',
	                type: 'boolean',
	                isPrivate: true,
	                hint: 'By default, I\'ll generate a types file that augments core types from @sprucelabs/spruce-core-schemas. Setting this to true will generate a stand alone types file.',
	                defaultValue: false,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(syncSchemasActionSchema)

export default syncSchemasActionSchema
