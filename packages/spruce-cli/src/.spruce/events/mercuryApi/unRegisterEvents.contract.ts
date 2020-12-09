import { buildEventContract } from '@sprucelabs/mercury-types'

import unRegisterEventsTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/unRegisterEventsTargetAndPayload.schema"
import unRegisterEventsResponsePayloadSchema from "#spruce/schemas/mercuryApi/unRegisterEventsResponsePayload.schema"


const unRegisterEventsEventContract = buildEventContract({
    eventSignatures: {
        'un-register-events': {
            emitPayloadSchema: unRegisterEventsTargetAndPayloadSchema,
            responsePayloadSchema: unRegisterEventsResponsePayloadSchema,
        }
    }
})
export default unRegisterEventsEventContract

export type UnRegisterEventsEventContract = typeof unRegisterEventsEventContract