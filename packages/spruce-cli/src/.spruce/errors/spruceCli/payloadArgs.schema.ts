import { SpruceErrors } from '../errors.types'




const payloadArgsSchema: SpruceErrors.SpruceCli.IPayloadArgsSchema  = {
	id: 'payloadArgs',
	name: 'Payload args',
	    fields: {
	            /** name. */
	            'name': {
	                label: 'name',
	                type: 'text',
	                options: undefined
	            },
	            /** value. */
	            'value': {
	                label: 'value',
	                type: 'text',
	                options: undefined
	            },
	    }
}

export default payloadArgsSchema
