import { buildEventContract } from '@sprucelabs/mercury-types'

import deleteRoleTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/deleteRoleTargetAndPayload.schema"
import deleteRoleResponsePayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/deleteRoleResponsePayload.schema"


const deleteRoleEventContract = buildEventContract({
    eventSignatures: {
        'delete-role::v2020_12_25': {
            emitPayloadSchema: deleteRoleTargetAndPayloadSchema,
            responsePayloadSchema: deleteRoleResponsePayloadSchema,
        }
    }
})
export default deleteRoleEventContract

export type DeleteRoleEventContract = typeof deleteRoleEventContract