import { buildEventContract } from '@sprucelabs/mercury-types'

import authenticateTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/authenticateTargetAndPayload.schema"
import authenticateResponsePayloadSchema from "#spruce/schemas/mercuryApi/authenticateResponsePayload.schema"


const authenticateEventContract = buildEventContract({
    eventSignatures: {
        'authenticate': {
            emitPayloadSchema: authenticateTargetAndPayloadSchema,
            responsePayloadSchema: authenticateResponsePayloadSchema,
        }
    }
})
export default authenticateEventContract

export type AuthenticateEventContract = typeof authenticateEventContract