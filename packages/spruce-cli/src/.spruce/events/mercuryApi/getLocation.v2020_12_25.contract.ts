import { buildEventContract } from '@sprucelabs/mercury-types'

import getLocationTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/getLocationTargetAndPayload.schema"
import getLocationResponsePayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/getLocationResponsePayload.schema"


const getLocationEventContract = buildEventContract({
    eventSignatures: {
        'get-location::v2020_12_25': {
            emitPayloadSchema: getLocationTargetAndPayloadSchema,
            responsePayloadSchema: getLocationResponsePayloadSchema,
        }
    }
})
export default getLocationEventContract

export type GetLocationEventContract = typeof getLocationEventContract