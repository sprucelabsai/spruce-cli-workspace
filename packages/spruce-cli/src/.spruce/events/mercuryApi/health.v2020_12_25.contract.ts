import { buildEventContract } from '@sprucelabs/mercury-types'

import healthResponsePayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/healthResponsePayload.schema"


const healthEventContract = buildEventContract({
    eventSignatures: {
        'health::v2020_12_25': {
            
            responsePayloadSchema: healthResponsePayloadSchema,
        }
    }
})
export default healthEventContract

export type HealthEventContract = typeof healthEventContract