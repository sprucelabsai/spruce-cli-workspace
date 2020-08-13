import { SpruceSchemas } from '../../schemas.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'



const createTestActionSchema: SpruceSchemas.Local.v2020_07_22.ICreateTestActionSchema  = {
	id: 'createTestAction',
	name: 'Create test action',
	description: 'Options for creating a new test.',
	    fields: {
	            /** Type. */
	            'type': {
	                label: 'Type',
	                type: FieldType.Select,
	                isRequired: true,
	                options: {choices: [{"value":"behavioral","label":"Behavioral"},{"value":"implementation","label":"Implementation"}],}
	            },
	            /** What are you testing?. E.g. Booking an appointment or turning on a light */
	            'nameReadable': {
	                label: 'What are you testing?',
	                type: FieldType.Text,
	                isRequired: true,
	                hint: 'E.g. Booking an appointment or turning on a light',
	                options: undefined
	            },
	            /** Test destination directory. Where I'll save your new test. */
	            'testDestinationDir': {
	                label: 'Test destination directory',
	                type: FieldType.Text,
	                hint: 'Where I\'ll save your new test.',
	                defaultValue: "src/__tests__",
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
	            /** Pascal case name. PascalCase of the name */
	            'namePascal': {
	                label: 'Pascal case name',
	                type: FieldType.Text,
	                hint: 'PascalCase of the name',
	                options: undefined
	            },
	    }
}

export default createTestActionSchema
