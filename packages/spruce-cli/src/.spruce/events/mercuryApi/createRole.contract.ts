import { buildEventContract } from '@sprucelabs/mercury-types'

import createRoleTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/createRoleTargetAndPayload.schema"
import createRoleResponsePayloadSchema from "#spruce/schemas/mercuryApi/createRoleResponsePayload.schema"


const createRoleEventContract = buildEventContract({
    eventSignatures: {
        'create-role': {
            emitPayloadSchema: createRoleTargetAndPayloadSchema,
            responsePayloadSchema: createRoleResponsePayloadSchema,
        }
    }
})
export default createRoleEventContract

export type CreateRoleEventContract = typeof createRoleEventContract