import { SpruceErrors } from '../errors.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'



const schemaExistsSchema: SpruceErrors.Local.ISchemaExistsSchema  = {
	id: 'schemaExists',
	name: 'Schema exists',
	    fields: {
	            /** Schema id. */
	            'schemaId': {
	                label: 'Schema id',
	                type: FieldType.Text,
	                isRequired: true,
	                options: undefined
	            },
	            /** Destination. */
	            'destination': {
	                label: 'Destination',
	                type: FieldType.Text,
	                options: undefined
	            },
	    }
}

export default schemaExistsSchema
