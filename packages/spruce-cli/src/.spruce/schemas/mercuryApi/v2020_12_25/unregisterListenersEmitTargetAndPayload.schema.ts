import { SchemaRegistry } from '@sprucelabs/schema'
import unregisterListenersEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/unregisterListenersEmitPayload.schema'
import { SpruceSchemas } from '../../schemas.types'

const unregisterListenersEmitTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.UnregisterListenersEmitTargetAndPayloadSchema = {
	id: 'unregisterListenersEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	fields: {
		/** . */
		payload: {
			type: 'schema',
			isRequired: true,
			options: { schema: unregisterListenersEmitPayloadSchema },
		},
	},
}

SchemaRegistry.getInstance().trackSchema(
	unregisterListenersEmitTargetAndPayloadSchema
)

export default unregisterListenersEmitTargetAndPayloadSchema
