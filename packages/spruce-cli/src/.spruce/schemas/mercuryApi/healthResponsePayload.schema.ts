import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import healthCheckItemSchema from '#spruce/schemas/mercuryApi/healthCheckItem.schema'

const healthResponsePayloadSchema: SpruceSchemas.MercuryApi.HealthResponsePayloadSchema  = {
	id: 'healthResponsePayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'skill': {
	                type: 'schema',
	                options: {schema: healthCheckItemSchema,}
	            },
	            /** . */
	            'mercury': {
	                type: 'schema',
	                options: {schema: healthCheckItemSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(healthResponsePayloadSchema)

export default healthResponsePayloadSchema
