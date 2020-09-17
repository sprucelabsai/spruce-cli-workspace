import { SpruceErrors } from '../errors.types'




const invalidCommandSchema: SpruceErrors.SpruceCli.IInvalidCommandSchema  = {
	id: 'invalidCommand',
	name: 'Invalid command',
	description: 'The command is not valid, try --help',
	    fields: {
	            /** args. */
	            'args': {
	                label: 'args',
	                type: 'text',
	                isRequired: true,
	                isArray: true,
	                options: undefined
	            },
	    }
}

export default invalidCommandSchema
