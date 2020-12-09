import { buildEventContract } from '@sprucelabs/mercury-types'

import requestPinTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/requestPinTargetAndPayload.schema"
import requestPinResponsePayloadSchema from "#spruce/schemas/mercuryApi/requestPinResponsePayload.schema"


const requestPinEventContract = buildEventContract({
    eventSignatures: {
        'request-pin': {
            emitPayloadSchema: requestPinTargetAndPayloadSchema,
            responsePayloadSchema: requestPinResponsePayloadSchema,
        }
    }
})
export default requestPinEventContract

export type RequestPinEventContract = typeof requestPinEventContract