import { buildEventContract } from '@sprucelabs/mercury-types'

import registerListenersTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/registerListenersTargetAndPayload.schema"


const registerListenersEventContract = buildEventContract({
    eventSignatures: {
        'register-listeners': {
            emitPayloadSchema: registerListenersTargetAndPayloadSchema,
            
        }
    }
})
export default registerListenersEventContract

export type RegisterListenersEventContract = typeof registerListenersEventContract