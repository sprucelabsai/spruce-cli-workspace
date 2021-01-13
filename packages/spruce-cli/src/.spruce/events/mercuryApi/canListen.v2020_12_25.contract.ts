import { buildEventContract } from '@sprucelabs/mercury-types'
import canListenEmitTargetAndPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/canListenEmitTargetAndPayload.schema'
import canListenResponsePayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/canListenResponsePayload.schema'

const canListenEventContract = buildEventContract({
	eventSignatures: {
		'can-listen::v2020_12_25': {
			emitPayloadSchema: canListenEmitTargetAndPayloadSchema,
			responsePayloadSchema: canListenResponsePayloadSchema,
		},
	},
})
export default canListenEventContract

export type CanListenEventContract = typeof canListenEventContract
