import { SchemaRegistry } from '@sprucelabs/schema'
import confirmPinEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/confirmPinEmitPayload.schema'
import { SpruceSchemas } from '../../schemas.types'

const confirmPinEmitTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.ConfirmPinEmitTargetAndPayloadSchema = {
	id: 'confirmPinEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	fields: {
		/** . */
		payload: {
			type: 'schema',
			isRequired: true,
			options: { schema: confirmPinEmitPayloadSchema },
		},
	},
}

SchemaRegistry.getInstance().trackSchema(confirmPinEmitTargetAndPayloadSchema)

export default confirmPinEmitTargetAndPayloadSchema
