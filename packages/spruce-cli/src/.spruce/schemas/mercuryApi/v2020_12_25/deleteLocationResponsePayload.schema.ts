import { SchemaRegistry } from '@sprucelabs/schema'
import locationSchema from '#spruce/schemas/spruce/v2020_07_22/location.schema'
import { SpruceSchemas } from '../../schemas.types'

const deleteLocationResponsePayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.DeleteLocationResponsePayloadSchema = {
	id: 'deleteLocationResponsePayload',
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

SchemaRegistry.getInstance().trackSchema(deleteLocationResponsePayloadSchema)

export default deleteLocationResponsePayloadSchema
