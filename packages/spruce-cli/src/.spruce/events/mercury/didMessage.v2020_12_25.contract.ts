import { buildEventContract } from '@sprucelabs/mercury-types'
import { buildPermissionContract } from '@sprucelabs/mercury-types'
import didMessageEmitTargetAndPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/didMessageEmitTargetAndPayload.schema'
import didMessageResponsePayloadSchema from '#spruce/schemas/mercury/v2020_12_25/didMessageResponsePayload.schema'

const didMessageEventContract = buildEventContract({
	eventSignatures: {
		'did-message::v2020_12_25': {
			emitPayloadSchema: didMessageEmitTargetAndPayloadSchema,
			responsePayloadSchema: didMessageResponsePayloadSchema,
			emitPermissionContract: buildPermissionContract({
				id: 'emit-messaging',
				name: 'Emit messaging events',
				description:
					'Various permissions related to emitting messaging events.',
				requireAllPermissions: false,
				permissions: [
					{
						id: 'can-emit-did-message-event',
						name: 'Emit did-message event',
					},
				],
			}),
			listenPermissionContract: buildPermissionContract({
				id: 'listen-messaging',
				name: 'Listen to messaging events',
				description: 'Various permissions related to listening for messages.',
				requireAllPermissions: false,
				permissions: [
					{
						id: 'can-listen-to-did-message-event',
						name: 'Listen to did-message event',
					},
				],
			}),
		},
	},
})
export default didMessageEventContract

export type DidMessageEventContract = typeof didMessageEventContract
