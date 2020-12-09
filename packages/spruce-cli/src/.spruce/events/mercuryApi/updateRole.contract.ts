import { buildEventContract } from '@sprucelabs/mercury-types'

import updateRoleTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/updateRoleTargetAndPayload.schema"
import updateRoleResponsePayloadSchema from "#spruce/schemas/mercuryApi/updateRoleResponsePayload.schema"


const updateRoleEventContract = buildEventContract({
    eventSignatures: {
        'update-role': {
            emitPayloadSchema: updateRoleTargetAndPayloadSchema,
            responsePayloadSchema: updateRoleResponsePayloadSchema,
        }
    }
})
export default updateRoleEventContract

export type UpdateRoleEventContract = typeof updateRoleEventContract