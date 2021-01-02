import { buildEventContract } from '@sprucelabs/mercury-types'

import registerEventsTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/registerEventsTargetAndPayload.schema"
import registerEventsResponsePayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/registerEventsResponsePayload.schema"


const registerEventsEventContract = buildEventContract({
    eventSignatures: {
        'register-events::v2020_12_25': {
            emitPayloadSchema: registerEventsTargetAndPayloadSchema,
            responsePayloadSchema: registerEventsResponsePayloadSchema,
        }
    }
})
export default registerEventsEventContract

export type RegisterEventsEventContract = typeof registerEventsEventContract