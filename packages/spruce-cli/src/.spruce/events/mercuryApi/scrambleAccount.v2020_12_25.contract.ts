import { buildEventContract } from '@sprucelabs/mercury-types'

import scrambleAccountResponsePayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/scrambleAccountResponsePayload.schema"


const scrambleAccountEventContract = buildEventContract({
    eventSignatures: {
        'scramble-account::v2020_12_25': {
            
            responsePayloadSchema: scrambleAccountResponsePayloadSchema,
            
            
        }
    }
})
export default scrambleAccountEventContract

export type ScrambleAccountEventContract = typeof scrambleAccountEventContract