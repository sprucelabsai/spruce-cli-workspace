import { SchemaRegistry } from '@sprucelabs/schema'
import unregisterEventsEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/unregisterEventsEmitPayload.schema'
import { SpruceSchemas } from '../../schemas.types'

const unregisterEventsEmitTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.UnregisterEventsEmitTargetAndPayloadSchema = {
	id: 'unregisterEventsEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	fields: {
		/** . */
		payload: {
			type: 'schema',
			isRequired: true,
			options: { schema: unregisterEventsEmitPayloadSchema },
		},
	},
}

SchemaRegistry.getInstance().trackSchema(
	unregisterEventsEmitTargetAndPayloadSchema
)

export default unregisterEventsEmitTargetAndPayloadSchema
