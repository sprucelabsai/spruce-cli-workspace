import { buildEventContract } from '@sprucelabs/mercury-types'

import createLocationTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/createLocationTargetAndPayload.schema"
import createLocationResponsePayloadSchema from "#spruce/schemas/mercuryApi/createLocationResponsePayload.schema"


const createLocationEventContract = buildEventContract({
    eventSignatures: {
        'create-location': {
            emitPayloadSchema: createLocationTargetAndPayloadSchema,
            responsePayloadSchema: createLocationResponsePayloadSchema,
        }
    }
})
export default createLocationEventContract

export type CreateLocationEventContract = typeof createLocationEventContract