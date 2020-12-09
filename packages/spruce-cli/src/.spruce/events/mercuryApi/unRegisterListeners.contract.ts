import { buildEventContract } from '@sprucelabs/mercury-types'

import unRegisterListenersTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/unRegisterListenersTargetAndPayload.schema"
import unRegisterListenersResponsePayloadSchema from "#spruce/schemas/mercuryApi/unRegisterListenersResponsePayload.schema"


const unRegisterListenersEventContract = buildEventContract({
    eventSignatures: {
        'un-register-listeners': {
            emitPayloadSchema: unRegisterListenersTargetAndPayloadSchema,
            responsePayloadSchema: unRegisterListenersResponsePayloadSchema,
        }
    }
})
export default unRegisterListenersEventContract

export type UnRegisterListenersEventContract = typeof unRegisterListenersEventContract