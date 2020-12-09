import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import locationSchema from '#spruce/schemas/spruce/v2020_07_22/location.schema'

const deleteLocationResponsePayloadSchema: SpruceSchemas.MercuryApi.DeleteLocationResponsePayloadSchema  = {
	id: 'deleteLocationResponsePayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'location': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: locationSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(deleteLocationResponsePayloadSchema)

export default deleteLocationResponsePayloadSchema
