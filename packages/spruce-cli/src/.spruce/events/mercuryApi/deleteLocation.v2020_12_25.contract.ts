import { buildEventContract } from '@sprucelabs/mercury-types'

import deleteLocationTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/deleteLocationTargetAndPayload.schema"
import deleteLocationResponsePayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/deleteLocationResponsePayload.schema"


const deleteLocationEventContract = buildEventContract({
    eventSignatures: {
        'delete-location::v2020_12_25': {
            emitPayloadSchema: deleteLocationTargetAndPayloadSchema,
            responsePayloadSchema: deleteLocationResponsePayloadSchema,
        }
    }
})
export default deleteLocationEventContract

export type DeleteLocationEventContract = typeof deleteLocationEventContract