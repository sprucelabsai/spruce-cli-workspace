import { SchemaRegistry } from '@sprucelabs/schema'
import registerListenersEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/registerListenersEmitPayload.schema'
import { SpruceSchemas } from '../../schemas.types'

const registerListenersEmitTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.RegisterListenersEmitTargetAndPayloadSchema = {
	id: 'registerListenersEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	fields: {
		/** . */
		payload: {
			type: 'schema',
			isRequired: true,
			options: { schema: registerListenersEmitPayloadSchema },
		},
	},
}

SchemaRegistry.getInstance().trackSchema(
	registerListenersEmitTargetAndPayloadSchema
)

export default registerListenersEmitTargetAndPayloadSchema
