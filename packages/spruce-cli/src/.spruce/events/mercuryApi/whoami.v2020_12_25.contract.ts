import { buildEventContract } from '@sprucelabs/mercury-types'

import authenticateResponsePayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/authenticateResponsePayload.schema"


const whoamiEventContract = buildEventContract({
    eventSignatures: {
        'whoami::v2020_12_25': {
            
            responsePayloadSchema: authenticateResponsePayloadSchema,
            
            
        }
    }
})
export default whoamiEventContract

export type WhoamiEventContract = typeof whoamiEventContract