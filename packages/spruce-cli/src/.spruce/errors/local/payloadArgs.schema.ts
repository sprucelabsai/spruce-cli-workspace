import { SpruceErrors } from '../errors.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'



const payloadArgsSchema: SpruceErrors.Local.IPayloadArgsSchema  = {
	id: 'payloadArgs',
	name: 'Payload args',
	    fields: {
	            /** name. */
	            'name': {
	                label: 'name',
	                type: FieldType.Text,
	                options: undefined
	            },
	            /** value. */
	            'value': {
	                label: 'value',
	                type: FieldType.Text,
	                options: undefined
	            },
	    }
}

export default payloadArgsSchema
