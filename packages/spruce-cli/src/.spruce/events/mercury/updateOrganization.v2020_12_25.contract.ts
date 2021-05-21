import { buildEventContract } from '@sprucelabs/mercury-types'
import updateOrganizationEmitTargetAndPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/updateOrganizationEmitTargetAndPayload.schema'
import updateOrgResponsePayloadSchema from '#spruce/schemas/mercury/v2020_12_25/updateOrgResponsePayload.schema'

const updateOrganizationEventContract = buildEventContract({
	eventSignatures: {
		'update-organization::v2020_12_25': {
			emitPayloadSchema: updateOrganizationEmitTargetAndPayloadSchema,
			responsePayloadSchema: updateOrgResponsePayloadSchema,
		},
	},
})
export default updateOrganizationEventContract

export type UpdateOrganizationEventContract =
	typeof updateOrganizationEventContract
