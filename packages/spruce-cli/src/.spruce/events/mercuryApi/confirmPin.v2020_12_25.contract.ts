import { buildEventContract } from '@sprucelabs/mercury-types'

import confirmPinTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/confirmPinTargetAndPayload.schema"
import confirmPinRespondPayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/confirmPinRespondPayload.schema"


const confirmPinEventContract = buildEventContract({
    eventSignatures: {
        'confirm-pin::v2020_12_25': {
            emitPayloadSchema: confirmPinTargetAndPayloadSchema,
            responsePayloadSchema: confirmPinRespondPayloadSchema,
        }
    }
})
export default confirmPinEventContract

export type ConfirmPinEventContract = typeof confirmPinEventContract