import { SchemaRegistry } from '@sprucelabs/schema'
import healthCheckItemSchema from '#spruce/schemas/mercuryApi/v2020_12_25/healthCheckItem.schema'
import { SpruceSchemas } from '../../schemas.types'

const healthResponsePayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.HealthResponsePayloadSchema = {
	id: 'healthResponsePayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	fields: {
		/** . */
		skill: {
			type: 'schema',
			options: { schema: healthCheckItemSchema },
		},
		/** . */
		mercury: {
			type: 'schema',
			options: { schema: healthCheckItemSchema },
		},
	},
}

SchemaRegistry.getInstance().trackSchema(healthResponsePayloadSchema)

export default healthResponsePayloadSchema
