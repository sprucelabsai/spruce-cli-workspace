import { buildEventContract } from '@sprucelabs/mercury-types'
import unregisterConversationTopicsEmitTargetAndPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/unregisterConversationTopicsEmitTargetAndPayload.schema'
import unregisterConversationTopicsResponsePayloadSchema from '#spruce/schemas/mercury/v2020_12_25/unregisterConversationTopicsResponsePayload.schema'

const unregisterConversationTopicsEventContract = buildEventContract({
	eventSignatures: {
		'unregister-conversation-topics::v2020_12_25': {
			emitPayloadSchema: unregisterConversationTopicsEmitTargetAndPayloadSchema,
			responsePayloadSchema: unregisterConversationTopicsResponsePayloadSchema,
		},
	},
})
export default unregisterConversationTopicsEventContract

export type UnregisterConversationTopicsEventContract =
	typeof unregisterConversationTopicsEventContract
