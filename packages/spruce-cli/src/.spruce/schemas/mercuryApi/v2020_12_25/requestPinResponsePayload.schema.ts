import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

const requestPinResponsePayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.RequestPinResponsePayloadSchema = {
	id: 'requestPinResponsePayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	fields: {
		/** . */
		challenge: {
			type: 'text',
			isRequired: true,
			options: undefined,
		},
	},
}

SchemaRegistry.getInstance().trackSchema(requestPinResponsePayloadSchema)

export default requestPinResponsePayloadSchema
