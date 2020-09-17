import { SpruceSchemas } from '../../schemas.types'




const namedTemplateItemSchema: SpruceSchemas.SpruceCli.v2020_07_22.INamedTemplateItemSchema  = {
	id: 'namedTemplateItem',
	name: 'NamedTemplateItem',
	description: 'Used to collect input on the names of a class or interface',
	    fields: {
	            /** Readable name. The name people will read */
	            'nameReadable': {
	                label: 'Readable name',
	                type: 'text',
	                isRequired: true,
	                hint: 'The name people will read',
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
	            /** Plural camel case name. camelCase version of the name */
	            'nameCamelPlural': {
	                label: 'Plural camel case name',
	                type: 'text',
	                hint: 'camelCase version of the name',
	                options: undefined
	            },
	            /** Pascal case name. PascalCase of the name */
	            'namePascal': {
	                label: 'Pascal case name',
	                type: 'text',
	                hint: 'PascalCase of the name',
	                options: undefined
	            },
	            /** Plural Pascal case name. PascalCase of the name */
	            'namePascalPlural': {
	                label: 'Plural Pascal case name',
	                type: 'text',
	                hint: 'PascalCase of the name',
	                options: undefined
	            },
	            /** Constant case name. CONST_CASE of the name */
	            'nameConst': {
	                label: 'Constant case name',
	                type: 'text',
	                hint: 'CONST_CASE of the name',
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

export default namedTemplateItemSchema
