import { buildEventContract } from '@sprucelabs/mercury-types'

import unRegisterListenersTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/unRegisterListenersTargetAndPayload.schema"
import unRegisterListenersResponsePayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/unRegisterListenersResponsePayload.schema"


const unRegisterListenersEventContract = buildEventContract({
    eventSignatures: {
        'unregister-listeners::v2020_12_25': {
            emitPayloadSchema: unRegisterListenersTargetAndPayloadSchema,
            responsePayloadSchema: unRegisterListenersResponsePayloadSchema,
        }
    }
})
export default unRegisterListenersEventContract

export type UnRegisterListenersEventContract = typeof unRegisterListenersEventContract