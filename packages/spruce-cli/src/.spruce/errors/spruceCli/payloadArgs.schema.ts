import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const payloadArgsSchema: SpruceErrors.SpruceCli.PayloadArgsSchema  = {
	id: 'payloadArgs',
	namespace: 'SpruceCli',
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

SchemaRegistry.getInstance().trackSchema(payloadArgsSchema)

export default payloadArgsSchema
