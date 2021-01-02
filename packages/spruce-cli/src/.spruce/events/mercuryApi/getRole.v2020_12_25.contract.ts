import { buildEventContract } from '@sprucelabs/mercury-types'

import getRoleTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/getRoleTargetAndPayload.schema"
import getRoleResponsePayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/getRoleResponsePayload.schema"


const getRoleEventContract = buildEventContract({
    eventSignatures: {
        'get-role::v2020_12_25': {
            emitPayloadSchema: getRoleTargetAndPayloadSchema,
            responsePayloadSchema: getRoleResponsePayloadSchema,
        }
    }
})
export default getRoleEventContract

export type GetRoleEventContract = typeof getRoleEventContract