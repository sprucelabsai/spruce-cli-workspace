import { buildEventContract } from '@sprucelabs/mercury-types'

import updateLocationTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/updateLocationTargetAndPayload.schema"
import updateLocationResponsePayloadSchema from "#spruce/schemas/mercuryApi/updateLocationResponsePayload.schema"


const updateLocationEventContract = buildEventContract({
    eventSignatures: {
        'update-location': {
            emitPayloadSchema: updateLocationTargetAndPayloadSchema,
            responsePayloadSchema: updateLocationResponsePayloadSchema,
        }
    }
})
export default updateLocationEventContract

export type UpdateLocationEventContract = typeof updateLocationEventContract