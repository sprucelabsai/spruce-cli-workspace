import { buildEventContract } from '@sprucelabs/mercury-types'

import deleteLocationTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/deleteLocationTargetAndPayload.schema"
import deleteLocationResponsePayloadSchema from "#spruce/schemas/mercuryApi/deleteLocationResponsePayload.schema"


const deleteLocationEventContract = buildEventContract({
    eventSignatures: {
        'delete-location': {
            emitPayloadSchema: deleteLocationTargetAndPayloadSchema,
            responsePayloadSchema: deleteLocationResponsePayloadSchema,
        }
    }
})
export default deleteLocationEventContract

export type DeleteLocationEventContract = typeof deleteLocationEventContract