import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const createErrorActionSchema: SpruceSchemas.SpruceCli.v2020_07_22.ICreateErrorActionSchema  = {
	id: 'createErrorAction',
	version: 'v2020_07_22',
	namespace: 'SpruceCli',
	name: 'Create error action',
	description: 'Create a builder for your brand new error! ',
	    fields: {
	            /** Addons lookup directory. Where I'll look for new schema fields to be registered. */
	            'addonsLookupDir': {
	                label: 'Addons lookup directory',
	                type: 'text',
	                hint: 'Where I\'ll look for new schema fields to be registered.',
	                defaultValue: "src/addons",
	                options: undefined
	            },
	            /** Error class destination. Where I'll save your new Error class file? */
	            'errorClassDestinationDir': {
	                label: 'Error class destination',
	                type: 'text',
	                isPrivate: true,
	                isRequired: true,
	                hint: 'Where I\'ll save your new Error class file?',
	                defaultValue: "src/errors",
	                options: undefined
	            },
	            /** . Where I should look for your error builders? */
	            'errorLookupDir': {
	                type: 'text',
	                hint: 'Where I should look for your error builders?',
	                defaultValue: "src/errors",
	                options: undefined
	            },
	            /** Types destination dir. This is where error options and type information will be written */
	            'errorTypesDestinationDir': {
	                label: 'Types destination dir',
	                type: 'text',
	                hint: 'This is where error options and type information will be written',
	                defaultValue: "#spruce/errors",
	                options: undefined
	            },
	            /** Error builder destination directory. Where I'll save your new builder file? */
	            'errorBuilderDestinationDir': {
	                label: 'Error builder destination directory',
	                type: 'text',
	                isPrivate: true,
	                isRequired: true,
	                hint: 'Where I\'ll save your new builder file?',
	                defaultValue: "./src/errors",
	                options: undefined
	            },
	            /** Readable name. The name people will read */
	            'nameReadable': {
	                label: 'Readable name',
	                type: 'text',
	                isRequired: true,
	                hint: 'The name people will read',
	                options: undefined
	            },
	            /** Pascal case name. PascalCase of the name */
	            'namePascal': {
	                label: 'Pascal case name',
	                type: 'text',
	                hint: 'PascalCase of the name',
	                options: undefined
	            },
	            /** Camel case name. camelCase version of the name */
	            'nameCamel': {
	                label: 'Camel case name',
	                type: 'text',
	                isRequired: true,
	                hint: 'camelCase version of the name',
	                options: undefined
	            },
	            /** Description. Describe a bit more here */
	            'description': {
	                label: 'Description',
	                type: 'text',
	                hint: 'Describe a bit more here',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(createErrorActionSchema)

export default createErrorActionSchema
