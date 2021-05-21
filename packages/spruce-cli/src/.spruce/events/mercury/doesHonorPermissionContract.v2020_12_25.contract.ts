import { buildEventContract } from '@sprucelabs/mercury-types'
import doesHonorPermissionContractEmitTargetAndPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/doesHonorPermissionContractEmitTargetAndPayload.schema'
import doesHonorPermissionContractRespondPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/doesHonorPermissionContractRespondPayload.schema'

const doesHonorPermissionContractEventContract = buildEventContract({
	eventSignatures: {
		'does-honor-permission-contract::v2020_12_25': {
			emitPayloadSchema: doesHonorPermissionContractEmitTargetAndPayloadSchema,
			responsePayloadSchema: doesHonorPermissionContractRespondPayloadSchema,
		},
	},
})
export default doesHonorPermissionContractEventContract

export type DoesHonorPermissionContractEventContract =
	typeof doesHonorPermissionContractEventContract
