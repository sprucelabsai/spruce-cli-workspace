import { SchemaRegistry } from '@sprucelabs/schema'
import registerEventsEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/registerEventsEmitPayload.schema'
import { SpruceSchemas } from '../../schemas.types'

const registerEventsEmitTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.RegisterEventsEmitTargetAndPayloadSchema = {
	id: 'registerEventsEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	fields: {
		/** . */
		payload: {
			type: 'schema',
			isRequired: true,
			options: { schema: registerEventsEmitPayloadSchema },
		},
	},
}

SchemaRegistry.getInstance().trackSchema(
	registerEventsEmitTargetAndPayloadSchema
)

export default registerEventsEmitTargetAndPayloadSchema
