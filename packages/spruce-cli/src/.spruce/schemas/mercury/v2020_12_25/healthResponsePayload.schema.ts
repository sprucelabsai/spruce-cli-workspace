import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import healthCheckItemSchema from '#spruce/schemas/mercury/v2020_12_25/healthCheckItem.schema'

const healthResponsePayloadSchema: SpruceSchemas.Mercury.v2020_12_25.HealthResponsePayloadSchema  = {
	id: 'healthResponsePayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
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
