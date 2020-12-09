import { buildEventContract } from '@sprucelabs/mercury-types'

import canListenTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/canListenTargetAndPayload.schema"
import canListenResponsePayloadSchema from "#spruce/schemas/mercuryApi/canListenResponsePayload.schema"


const canListenEventContract = buildEventContract({
    eventSignatures: {
        'can-listen': {
            emitPayloadSchema: canListenTargetAndPayloadSchema,
            responsePayloadSchema: canListenResponsePayloadSchema,
        }
    }
})
export default canListenEventContract

export type CanListenEventContract = typeof canListenEventContract