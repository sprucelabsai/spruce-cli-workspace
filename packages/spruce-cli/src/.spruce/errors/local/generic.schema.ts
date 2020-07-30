import { SpruceErrors } from '../errors.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'



const genericSchema: SpruceErrors.Local.IGenericSchema  = {
	id: 'generic',
	name: 'generic',
	description: 'When you\'re too lazy to make a new error',
	    fields: {
	            /** Friendly message. */
	            'friendlyMessageSet': {
	                label: 'Friendly message',
	                type: FieldType.Text,
	                options: undefined
	            },
	    }
}

export default genericSchema
