import { buildEventContract } from '@sprucelabs/mercury-types'

import createRoleTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/createRoleTargetAndPayload.schema"
import createRoleResponsePayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/createRoleResponsePayload.schema"


const createRoleEventContract = buildEventContract({
    eventSignatures: {
        'create-role::v2020_12_25': {
            emitPayloadSchema: createRoleTargetAndPayloadSchema,
            responsePayloadSchema: createRoleResponsePayloadSchema,
        }
    }
})
export default createRoleEventContract

export type CreateRoleEventContract = typeof createRoleEventContract