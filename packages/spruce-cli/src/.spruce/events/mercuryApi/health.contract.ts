import { buildEventContract } from '@sprucelabs/mercury-types'

import healthResponsePayloadSchema from "#spruce/schemas/mercuryApi/healthResponsePayload.schema"


const healthEventContract = buildEventContract({
    eventSignatures: {
        'health': {
            
            responsePayloadSchema: healthResponsePayloadSchema,
        }
    }
})
export default healthEventContract

export type HealthEventContract = typeof healthEventContract