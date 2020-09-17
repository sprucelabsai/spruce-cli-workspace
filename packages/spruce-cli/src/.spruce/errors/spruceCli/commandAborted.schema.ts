import { SpruceErrors } from '../errors.types'




const commandAbortedSchema: SpruceErrors.SpruceCli.ICommandAbortedSchema  = {
	id: 'commandAborted',
	name: 'Command aborted',
	    fields: {
	            /** Command. */
	            'command': {
	                label: 'Command',
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

export default commandAbortedSchema
