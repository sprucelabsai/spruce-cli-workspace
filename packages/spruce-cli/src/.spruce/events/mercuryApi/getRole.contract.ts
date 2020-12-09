import { buildEventContract } from '@sprucelabs/mercury-types'

import getRoleTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/getRoleTargetAndPayload.schema"
import getRoleResponsePayloadSchema from "#spruce/schemas/mercuryApi/getRoleResponsePayload.schema"


const getRoleEventContract = buildEventContract({
    eventSignatures: {
        'get-role': {
            emitPayloadSchema: getRoleTargetAndPayloadSchema,
            responsePayloadSchema: getRoleResponsePayloadSchema,
        }
    }
})
export default getRoleEventContract

export type GetRoleEventContract = typeof getRoleEventContract