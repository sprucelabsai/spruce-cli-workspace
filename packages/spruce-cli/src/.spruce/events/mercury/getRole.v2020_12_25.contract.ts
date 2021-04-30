import { buildEventContract } from '@sprucelabs/mercury-types'
import getRoleEmitTargetAndPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/getRoleEmitTargetAndPayload.schema'
import getRoleResponsePayloadSchema from '#spruce/schemas/mercury/v2020_12_25/getRoleResponsePayload.schema'

const getRoleEventContract = buildEventContract({
	eventSignatures: {
		'get-role::v2020_12_25': {
			emitPayloadSchema: getRoleEmitTargetAndPayloadSchema,
			responsePayloadSchema: getRoleResponsePayloadSchema,
		},
	},
})
export default getRoleEventContract

export type GetRoleEventContract = typeof getRoleEventContract
