import { buildEventContract } from '@sprucelabs/mercury-types'

import confirmPinTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/confirmPinTargetAndPayload.schema"
import confirmPinRespondPayloadSchema from "#spruce/schemas/mercuryApi/confirmPinRespondPayload.schema"


const confirmPinEventContract = buildEventContract({
    eventSignatures: {
        'confirm-pin': {
            emitPayloadSchema: confirmPinTargetAndPayloadSchema,
            responsePayloadSchema: confirmPinRespondPayloadSchema,
        }
    }
})
export default confirmPinEventContract

export type ConfirmPinEventContract = typeof confirmPinEventContract