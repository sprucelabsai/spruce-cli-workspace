import { SpruceErrors } from '../errors.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'



const invalidCommandSchema: SpruceErrors.Local.IInvalidCommandSchema  = {
	id: 'invalidCommand',
	name: 'Invalid command',
	description: 'The command is not valid, try --help',
	    fields: {
	            /** args. */
	            'args': {
	                label: 'args',
	                type: FieldType.Text,
	                isRequired: true,
	                isArray: true,
	                options: undefined
	            },
	    }
}

export default invalidCommandSchema
