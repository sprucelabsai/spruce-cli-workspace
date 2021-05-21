import { buildEventContract } from '@sprucelabs/mercury-types'
import unregisterListenersEmitTargetAndPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/unregisterListenersEmitTargetAndPayload.schema'
import unregisterListenersResponsePayloadSchema from '#spruce/schemas/mercury/v2020_12_25/unregisterListenersResponsePayload.schema'

const unregisterListenersEventContract = buildEventContract({
	eventSignatures: {
		'unregister-listeners::v2020_12_25': {
			emitPayloadSchema: unregisterListenersEmitTargetAndPayloadSchema,
			responsePayloadSchema: unregisterListenersResponsePayloadSchema,
		},
	},
})
export default unregisterListenersEventContract

export type UnregisterListenersEventContract =
	typeof unregisterListenersEventContract
