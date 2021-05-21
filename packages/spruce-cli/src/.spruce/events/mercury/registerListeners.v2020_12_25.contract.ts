import { buildEventContract } from '@sprucelabs/mercury-types'
import registerListenersEmitTargetAndPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/registerListenersEmitTargetAndPayload.schema'

const registerListenersEventContract = buildEventContract({
	eventSignatures: {
		'register-listeners::v2020_12_25': {
			emitPayloadSchema: registerListenersEmitTargetAndPayloadSchema,
		},
	},
})
export default registerListenersEventContract

export type RegisterListenersEventContract =
	typeof registerListenersEventContract
