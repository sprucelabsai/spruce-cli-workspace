import { buildEventContract } from '@sprucelabs/mercury-types'

import listOrganizationsTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/listOrganizationsTargetAndPayload.schema"
import listOrgsResponsePayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/listOrgsResponsePayload.schema"


const listOrganizationsEventContract = buildEventContract({
    eventSignatures: {
        'list-organizations::v2020_12_25': {
            emitPayloadSchema: listOrganizationsTargetAndPayloadSchema,
            responsePayloadSchema: listOrgsResponsePayloadSchema,
        }
    }
})
export default listOrganizationsEventContract

export type ListOrganizationsEventContract = typeof listOrganizationsEventContract