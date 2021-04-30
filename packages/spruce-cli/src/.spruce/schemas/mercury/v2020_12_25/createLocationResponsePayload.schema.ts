import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import locationSchema from '#spruce/schemas/spruce/v2020_07_22/location.schema'

const createLocationResponsePayloadSchema: SpruceSchemas.Mercury.v2020_12_25.CreateLocationResponsePayloadSchema  = {
	id: 'createLocationResponsePayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
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

SchemaRegistry.getInstance().trackSchema(createLocationResponsePayloadSchema)

export default createLocationResponsePayloadSchema
