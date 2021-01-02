import { buildEventContract } from '@sprucelabs/mercury-types'

import registerListenersTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/registerListenersTargetAndPayload.schema"


const registerListenersEventContract = buildEventContract({
    eventSignatures: {
        'register-listeners::v2020_12_25': {
            emitPayloadSchema: registerListenersTargetAndPayloadSchema,
            
        }
    }
})
export default registerListenersEventContract

export type RegisterListenersEventContract = typeof registerListenersEventContract