import { buildEventContract } from '@sprucelabs/mercury-types'

import authenticateTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/authenticateTargetAndPayload.schema"
import authenticateResponsePayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/authenticateResponsePayload.schema"


const authenticateEventContract = buildEventContract({
    eventSignatures: {
        'authenticate::v2020_12_25': {
            emitPayloadSchema: authenticateTargetAndPayloadSchema,
            responsePayloadSchema: authenticateResponsePayloadSchema,
        }
    }
})
export default authenticateEventContract

export type AuthenticateEventContract = typeof authenticateEventContract