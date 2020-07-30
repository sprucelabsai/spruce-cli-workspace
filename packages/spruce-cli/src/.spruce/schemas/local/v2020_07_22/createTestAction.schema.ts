import { SpruceSchemas } from '../../schemas.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'



const createTestActionSchema: SpruceSchemas.Local.v2020_07_22.ICreateTestActionSchema  = {
	id: 'createTestAction',
	name: 'Create test action',
	description: 'Important: Start here!',
	    fields: {
	            /** Type. */
	            'type': {
	                label: 'Type',
	                type: FieldType.Select,
	                isRequired: true,
	                options: {choices: [{"value":"behavioral","label":"Behavioral"},{"value":"implementation","label":"Implementation"}],}
	            },
	            /** What are you testing?. E.g. Booking an appointment or Turning on a light */
	            'name': {
	                label: 'What are you testing?',
	                type: FieldType.Text,
	                isRequired: true,
	                hint: 'E.g. Booking an appointment or Turning on a light',
	                options: undefined
	            },
	    }
}

export default createTestActionSchema
