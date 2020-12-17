import { buildEventContract } from '@sprucelabs/mercury-types'

import listOrganizationsTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/listOrganizationsTargetAndPayload.schema"
import listOrgsResponsePayloadSchema from "#spruce/schemas/mercuryApi/listOrgsResponsePayload.schema"


const listOrganizationsEventContract = buildEventContract({
    eventSignatures: {
        'list-organizations': {
            emitPayloadSchema: listOrganizationsTargetAndPayloadSchema,
            responsePayloadSchema: listOrgsResponsePayloadSchema,
        }
    }
})
export default listOrganizationsEventContract

export type ListOrganizationsEventContract = typeof listOrganizationsEventContract