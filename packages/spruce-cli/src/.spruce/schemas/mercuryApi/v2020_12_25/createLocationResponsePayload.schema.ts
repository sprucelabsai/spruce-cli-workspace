import { SchemaRegistry } from '@sprucelabs/schema'
import locationSchema from '#spruce/schemas/spruce/v2020_07_22/location.schema'
import { SpruceSchemas } from '../../schemas.types'

const createLocationResponsePayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.CreateLocationResponsePayloadSchema = {
	id: 'createLocationResponsePayload',
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

SchemaRegistry.getInstance().trackSchema(createLocationResponsePayloadSchema)

export default createLocationResponsePayloadSchema
