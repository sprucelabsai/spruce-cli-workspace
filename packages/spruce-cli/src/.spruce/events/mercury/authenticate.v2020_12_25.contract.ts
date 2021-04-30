import { buildEventContract } from '@sprucelabs/mercury-types'
import authenticateEmitTargetAndPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/authenticateEmitTargetAndPayload.schema'
import authenticateResponsePayloadSchema from '#spruce/schemas/mercury/v2020_12_25/authenticateResponsePayload.schema'

const authenticateEventContract = buildEventContract({
	eventSignatures: {
		'authenticate::v2020_12_25': {
			emitPayloadSchema: authenticateEmitTargetAndPayloadSchema,
			responsePayloadSchema: authenticateResponsePayloadSchema,
		},
	},
})
export default authenticateEventContract

export type AuthenticateEventContract = typeof authenticateEventContract
