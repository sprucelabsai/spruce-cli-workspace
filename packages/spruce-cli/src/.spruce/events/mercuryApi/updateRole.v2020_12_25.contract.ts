import { buildEventContract } from '@sprucelabs/mercury-types'

import updateRoleTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/updateRoleTargetAndPayload.schema"
import updateRoleResponsePayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/updateRoleResponsePayload.schema"


const updateRoleEventContract = buildEventContract({
    eventSignatures: {
        'update-role::v2020_12_25': {
            emitPayloadSchema: updateRoleTargetAndPayloadSchema,
            responsePayloadSchema: updateRoleResponsePayloadSchema,
        }
    }
})
export default updateRoleEventContract

export type UpdateRoleEventContract = typeof updateRoleEventContract