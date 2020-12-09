import { buildEventContract } from '@sprucelabs/mercury-types'

import scrambleAccountResponsePayloadSchema from "#spruce/schemas/mercuryApi/scrambleAccountResponsePayload.schema"


const scrambleAccountEventContract = buildEventContract({
    eventSignatures: {
        'scramble-account': {
            
            responsePayloadSchema: scrambleAccountResponsePayloadSchema,
        }
    }
})
export default scrambleAccountEventContract

export type ScrambleAccountEventContract = typeof scrambleAccountEventContract