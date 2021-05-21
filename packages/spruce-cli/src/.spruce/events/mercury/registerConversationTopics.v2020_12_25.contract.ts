import { buildEventContract } from '@sprucelabs/mercury-types'
import registerConversationTopicsEmitTargetAndPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/registerConversationTopicsEmitTargetAndPayload.schema'
import registerConversationTopicsResponsePayloadSchema from '#spruce/schemas/mercury/v2020_12_25/registerConversationTopicsResponsePayload.schema'

const registerConversationTopicsEventContract = buildEventContract({
	eventSignatures: {
		'register-conversation-topics::v2020_12_25': {
			emitPayloadSchema: registerConversationTopicsEmitTargetAndPayloadSchema,
			responsePayloadSchema: registerConversationTopicsResponsePayloadSchema,
		},
	},
})
export default registerConversationTopicsEventContract

export type RegisterConversationTopicsEventContract =
	typeof registerConversationTopicsEventContract
