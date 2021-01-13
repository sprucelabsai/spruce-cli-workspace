import { SchemaRegistry } from '@sprucelabs/schema'
import requestPinEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/requestPinEmitPayload.schema'
import { SpruceSchemas } from '../../schemas.types'

const requestPinEmitTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.RequestPinEmitTargetAndPayloadSchema = {
	id: 'requestPinEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	fields: {
		/** . */
		payload: {
			type: 'schema',
			isRequired: true,
			options: { schema: requestPinEmitPayloadSchema },
		},
	},
}

SchemaRegistry.getInstance().trackSchema(requestPinEmitTargetAndPayloadSchema)

export default requestPinEmitTargetAndPayloadSchema
