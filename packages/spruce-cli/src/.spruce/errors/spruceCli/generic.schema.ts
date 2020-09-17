import { SpruceErrors } from '../errors.types'




const genericSchema: SpruceErrors.SpruceCli.IGenericSchema  = {
	id: 'generic',
	name: 'generic',
	description: 'When you\'re too lazy to make a new error',
	    fields: {
	            /** Friendly message. */
	            'friendlyMessageSet': {
	                label: 'Friendly message',
	                type: 'text',
	                options: undefined
	            },
	    }
}

export default genericSchema
