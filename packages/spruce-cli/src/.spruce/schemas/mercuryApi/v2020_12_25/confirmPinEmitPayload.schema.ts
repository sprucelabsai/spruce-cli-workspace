import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

const confirmPinEmitPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.ConfirmPinEmitPayloadSchema = {
	id: 'confirmPinEmitPayload',
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
		/** . */
		pin: {
			type: 'text',
			isRequired: true,
			options: undefined,
		},
	},
}

SchemaRegistry.getInstance().trackSchema(confirmPinEmitPayloadSchema)

export default confirmPinEmitPayloadSchema
