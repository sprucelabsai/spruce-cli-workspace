import { buildEventContract } from '@sprucelabs/mercury-types'

import logoutResponsePayloadSchema from "#spruce/schemas/mercuryApi/logoutResponsePayload.schema"


const logoutEventContract = buildEventContract({
    eventSignatures: {
        'logout': {
            
            responsePayloadSchema: logoutResponsePayloadSchema,
        }
    }
})
export default logoutEventContract

export type LogoutEventContract = typeof logoutEventContract