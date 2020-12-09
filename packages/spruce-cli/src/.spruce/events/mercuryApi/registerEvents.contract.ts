import { buildEventContract } from '@sprucelabs/mercury-types'

import registerEventsTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/registerEventsTargetAndPayload.schema"
import registerEventsResponsePayloadSchema from "#spruce/schemas/mercuryApi/registerEventsResponsePayload.schema"


const registerEventsEventContract = buildEventContract({
    eventSignatures: {
        'register-events': {
            emitPayloadSchema: registerEventsTargetAndPayloadSchema,
            responsePayloadSchema: registerEventsResponsePayloadSchema,
        }
    }
})
export default registerEventsEventContract

export type RegisterEventsEventContract = typeof registerEventsEventContract