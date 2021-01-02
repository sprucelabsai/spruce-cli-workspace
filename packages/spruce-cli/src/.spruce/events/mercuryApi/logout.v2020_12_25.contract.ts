import { buildEventContract } from '@sprucelabs/mercury-types'

import logoutResponsePayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/logoutResponsePayload.schema"


const logoutEventContract = buildEventContract({
    eventSignatures: {
        'logout::v2020_12_25': {
            
            responsePayloadSchema: logoutResponsePayloadSchema,
        }
    }
})
export default logoutEventContract

export type LogoutEventContract = typeof logoutEventContract