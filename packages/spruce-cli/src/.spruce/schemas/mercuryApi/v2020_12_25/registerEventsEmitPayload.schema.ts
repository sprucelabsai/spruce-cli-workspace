import { SchemaRegistry } from '@sprucelabs/schema'
import eventContractSchema from '#spruce/schemas/mercuryTypes/v2020_09_01/eventContract.schema'
import { SpruceSchemas } from '../../schemas.types'

const registerEventsEmitPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.RegisterEventsEmitPayloadSchema = {
	id: 'registerEventsEmitPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	fields: {
		/** . */
		contract: {
			type: 'schema',
			isRequired: true,
			options: { schema: eventContractSchema },
		},
	},
}

SchemaRegistry.getInstance().trackSchema(registerEventsEmitPayloadSchema)

export default registerEventsEmitPayloadSchema
