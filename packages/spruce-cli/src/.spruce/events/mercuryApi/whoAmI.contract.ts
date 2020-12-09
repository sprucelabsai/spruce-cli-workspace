import { buildEventContract } from '@sprucelabs/mercury-types'

import authenticateResponsePayloadSchema from "#spruce/schemas/mercuryApi/authenticateResponsePayload.schema"


const whoAmIEventContract = buildEventContract({
    eventSignatures: {
        'who-am-i': {
            
            responsePayloadSchema: authenticateResponsePayloadSchema,
        }
    }
})
export default whoAmIEventContract

export type WhoAmIEventContract = typeof whoAmIEventContract