import { buildEventContract } from '@sprucelabs/mercury-types'

import getLocationTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/getLocationTargetAndPayload.schema"
import getLocationResponsePayloadSchema from "#spruce/schemas/mercuryApi/getLocationResponsePayload.schema"


const getLocationEventContract = buildEventContract({
    eventSignatures: {
        'get-location': {
            emitPayloadSchema: getLocationTargetAndPayloadSchema,
            responsePayloadSchema: getLocationResponsePayloadSchema,
        }
    }
})
export default getLocationEventContract

export type GetLocationEventContract = typeof getLocationEventContract