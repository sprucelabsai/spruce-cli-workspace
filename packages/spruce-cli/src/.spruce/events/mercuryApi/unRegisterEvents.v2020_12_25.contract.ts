import { buildEventContract } from '@sprucelabs/mercury-types'

import unRegisterEventsTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/unRegisterEventsTargetAndPayload.schema"
import unRegisterEventsResponsePayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/unRegisterEventsResponsePayload.schema"


const unRegisterEventsEventContract = buildEventContract({
    eventSignatures: {
        'un-register-events::v2020_12_25': {
            emitPayloadSchema: unRegisterEventsTargetAndPayloadSchema,
            responsePayloadSchema: unRegisterEventsResponsePayloadSchema,
        }
    }
})
export default unRegisterEventsEventContract

export type UnRegisterEventsEventContract = typeof unRegisterEventsEventContract