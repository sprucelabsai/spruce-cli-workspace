import { buildEventContract } from '@sprucelabs/mercury-types'
import { buildPermissionContract } from '@sprucelabs/mercury-types'
import didMessageEmitTargetAndPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/didMessageEmitTargetAndPayload.schema'
import didMessageResponsePayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/didMessageResponsePayload.schema'

const didMessageEventContract = buildEventContract({
	eventSignatures: {
		'did-message::v2020_12_25': {
			emitPayloadSchema: didMessageEmitTargetAndPayloadSchema,
			responsePayloadSchema: didMessageResponsePayloadSchema,
			emitPermissionContract: buildPermissionContract({
				id: 'messaging',
				name: 'Messaging',
				description: 'Various permissions related to messaging',
				requireAllPermissions: false,
				permissions: [
					{
						id: 'can-emit-did-message-event',
						name: 'Emit did-message event',
					},
					{
						id: 'can-listen-to-did-message-event',
						name: 'Listen to did-message event',
					},
				],
			}),
			listenPermissionContract: buildPermissionContract({
				id: 'messaging',
				name: 'Messaging',
				description: 'Various permissions related to messaging',
				requireAllPermissions: false,
				permissions: [
					{
						id: 'can-emit-did-message-event',
						name: 'Emit did-message event',
					},
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
