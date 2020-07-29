import { SpruceSchemas } from '../../schemas.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'



const namedTemplateItemDefinition: SpruceSchemas.Local.v2020_07_22.INamedTemplateItemDefinition  = {
	id: 'namedTemplateItem',
	name: 'NamedTemplateItem',
	description: 'Used to collect input on the names of a class or interface',
	    fields: {
	            /** Readable name. The name people will read */
	            'nameReadable': {
	                label: 'Readable name',
	                type: FieldType.Text,
	                hint: 'The name people will read',
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
	            /** Plural camel case name. camelCase version of the name */
	            'nameCamelPlural': {
	                label: 'Plural camel case name',
	                type: FieldType.Text,
	                hint: 'camelCase version of the name',
	                options: undefined
	            },
	            /** Pascal case name. PascalCase of the name */
	            'namePascal': {
	                label: 'Pascal case name',
	                type: FieldType.Text,
	                hint: 'PascalCase of the name',
	                options: undefined
	            },
	            /** Plural Pascal case name. PascalCase of the name */
	            'namePascalPlural': {
	                label: 'Plural Pascal case name',
	                type: FieldType.Text,
	                hint: 'PascalCase of the name',
	                options: undefined
	            },
	            /** Constant case name. CONST_CASE of the name */
	            'nameConst': {
	                label: 'Constant case name',
	                type: FieldType.Text,
	                hint: 'CONST_CASE of the name',
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

export default namedTemplateItemDefinition
