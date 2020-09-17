import { SpruceErrors } from '../errors.types'


import payloadArgsSchema from '#spruce/errors/spruceCli/payloadArgs.schema'

const genericMercurySchema: SpruceErrors.SpruceCli.IGenericMercurySchema  = {
	id: 'genericMercury',
	name: 'Generic mercury',
	description: 'Not sure what happened, but it has something to do with Mercury',
	    fields: {
	            /** Event name. */
	            'eventName': {
	                label: 'Event name',
	                type: 'text',
	                options: undefined
	            },
	            /** Payload. A hint */
	            'payloadArgs': {
	                label: 'Payload',
	                type: 'schema',
	                hint: 'A hint',
	                isArray: true,
	                options: {schema: payloadArgsSchema,}
	            },
	    }
}

export default genericMercurySchema
