import { buildEventContract } from '@sprucelabs/mercury-types'

import listOrgsResponsePayloadSchema from "#spruce/schemas/mercuryApi/listOrgsResponsePayload.schema"


const listOrganizationsEventContract = buildEventContract({
    eventSignatures: {
        'list-organizations': {
            
            responsePayloadSchema: listOrgsResponsePayloadSchema,
        }
    }
})
export default listOrganizationsEventContract

export type ListOrganizationsEventContract = typeof listOrganizationsEventContract