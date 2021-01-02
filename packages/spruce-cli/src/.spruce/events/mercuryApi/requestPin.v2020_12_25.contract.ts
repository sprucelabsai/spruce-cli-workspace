import { buildEventContract } from '@sprucelabs/mercury-types'

import requestPinTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/requestPinTargetAndPayload.schema"
import requestPinResponsePayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/requestPinResponsePayload.schema"


const requestPinEventContract = buildEventContract({
    eventSignatures: {
        'request-pin::v2020_12_25': {
            emitPayloadSchema: requestPinTargetAndPayloadSchema,
            responsePayloadSchema: requestPinResponsePayloadSchema,
        }
    }
})
export default requestPinEventContract

export type RequestPinEventContract = typeof requestPinEventContract