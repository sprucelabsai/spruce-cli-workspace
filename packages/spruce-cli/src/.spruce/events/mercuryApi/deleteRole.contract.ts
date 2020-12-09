import { buildEventContract } from '@sprucelabs/mercury-types'

import deleteRoleTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/deleteRoleTargetAndPayload.schema"
import deleteRoleResponsePayloadSchema from "#spruce/schemas/mercuryApi/deleteRoleResponsePayload.schema"


const deleteRoleEventContract = buildEventContract({
    eventSignatures: {
        'delete-role': {
            emitPayloadSchema: deleteRoleTargetAndPayloadSchema,
            responsePayloadSchema: deleteRoleResponsePayloadSchema,
        }
    }
})
export default deleteRoleEventContract

export type DeleteRoleEventContract = typeof deleteRoleEventContract