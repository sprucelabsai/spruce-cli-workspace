import { buildEventContract } from '@sprucelabs/mercury-types'

import canListenTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/canListenTargetAndPayload.schema"
import canListenResponsePayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/canListenResponsePayload.schema"


const canListenEventContract = buildEventContract({
    eventSignatures: {
        'can-listen::v2020_12_25': {
            emitPayloadSchema: canListenTargetAndPayloadSchema,
            responsePayloadSchema: canListenResponsePayloadSchema,
        }
    }
})
export default canListenEventContract

export type CanListenEventContract = typeof canListenEventContract