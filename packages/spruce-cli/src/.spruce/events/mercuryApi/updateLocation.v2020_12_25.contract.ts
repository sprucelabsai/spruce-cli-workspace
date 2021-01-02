import { buildEventContract } from '@sprucelabs/mercury-types'

import updateLocationTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/updateLocationTargetAndPayload.schema"
import updateLocationResponsePayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/updateLocationResponsePayload.schema"


const updateLocationEventContract = buildEventContract({
    eventSignatures: {
        'update-location::v2020_12_25': {
            emitPayloadSchema: updateLocationTargetAndPayloadSchema,
            responsePayloadSchema: updateLocationResponsePayloadSchema,
        }
    }
})
export default updateLocationEventContract

export type UpdateLocationEventContract = typeof updateLocationEventContract