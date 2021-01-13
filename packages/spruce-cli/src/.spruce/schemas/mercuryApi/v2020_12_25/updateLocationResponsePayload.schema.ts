import { SchemaRegistry } from '@sprucelabs/schema'
import locationSchema from '#spruce/schemas/spruce/v2020_07_22/location.schema'
import { SpruceSchemas } from '../../schemas.types'

const updateLocationResponsePayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.UpdateLocationResponsePayloadSchema = {
	id: 'updateLocationResponsePayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	fields: {
		/** . */
		location: {
			type: 'schema',
			isRequired: true,
			options: { schema: locationSchema },
		},
	},
}

SchemaRegistry.getInstance().trackSchema(updateLocationResponsePayloadSchema)

export default updateLocationResponsePayloadSchema
