import { SpruceErrors } from '../errors.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

import payloadArgsSchema from '#spruce/errors/spruceCli/payloadArgs.schema'

const genericMercurySchema: SpruceErrors.SpruceCli.IGenericMercurySchema  = {
	id: 'genericMercury',
	name: 'Generic mercury',
	description: 'Not sure what happened, but it has something to do with Mercury',
	    fields: {
	            /** Event name. */
	            'eventName': {
	                label: 'Event name',
	                type: FieldType.Text,
	                options: undefined
	            },
	            /** Payload. A hint */
	            'payloadArgs': {
	                label: 'Payload',
	                type: FieldType.Schema,
	                hint: 'A hint',
	                isArray: true,
	                options: {schema: payloadArgsSchema,}
	            },
	    }
}

export default genericMercurySchema