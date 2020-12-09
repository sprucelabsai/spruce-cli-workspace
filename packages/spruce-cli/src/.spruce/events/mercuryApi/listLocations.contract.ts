import { buildEventContract } from '@sprucelabs/mercury-types'

import listLocationsTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/listLocationsTargetAndPayload.schema"
import listLocationsResponsePayloadSchema from "#spruce/schemas/mercuryApi/listLocationsResponsePayload.schema"


const listLocationsEventContract = buildEventContract({
    eventSignatures: {
        'list-locations': {
            emitPayloadSchema: listLocationsTargetAndPayloadSchema,
            responsePayloadSchema: listLocationsResponsePayloadSchema,
        }
    }
})
export default listLocationsEventContract

export type ListLocationsEventContract = typeof listLocationsEventContract