import { buildEventContract } from '@sprucelabs/mercury-types'

import listLocationsTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/listLocationsTargetAndPayload.schema"
import listLocationsResponsePayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/listLocationsResponsePayload.schema"


const listLocationsEventContract = buildEventContract({
    eventSignatures: {
        'list-locations::v2020_12_25': {
            emitPayloadSchema: listLocationsTargetAndPayloadSchema,
            responsePayloadSchema: listLocationsResponsePayloadSchema,
        }
    }
})
export default listLocationsEventContract

export type ListLocationsEventContract = typeof listLocationsEventContract