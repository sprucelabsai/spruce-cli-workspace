import { SchemaRegistry } from '@sprucelabs/schema'
import canListenEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/canListenEmitPayload.schema'
import { SpruceSchemas } from '../../schemas.types'

const canListenEmitTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.CanListenEmitTargetAndPayloadSchema = {
	id: 'canListenEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	fields: {
		/** . */
		payload: {
			type: 'schema',
			isRequired: true,
			options: { schema: canListenEmitPayloadSchema },
		},
	},
}

SchemaRegistry.getInstance().trackSchema(canListenEmitTargetAndPayloadSchema)

export default canListenEmitTargetAndPayloadSchema
