import { SpruceErrors } from '../errors.types'




const schemaExistsSchema: SpruceErrors.SpruceCli.ISchemaExistsSchema  = {
	id: 'schemaExists',
	name: 'Schema exists',
	    fields: {
	            /** Schema id. */
	            'schemaId': {
	                label: 'Schema id',
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	            /** Destination. */
	            'destination': {
	                label: 'Destination',
	                type: 'text',
	                options: undefined
	            },
	    }
}

export default schemaExistsSchema
