import { buildEventContract } from '@sprucelabs/mercury-types'

import deleteOrganizationTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/deleteOrganizationTargetAndPayload.schema"
import deleteOrgResponsePayloadSchema from "#spruce/schemas/mercuryApi/deleteOrgResponsePayload.schema"


const deleteOrganizationEventContract = buildEventContract({
    eventSignatures: {
        'delete-organization': {
            emitPayloadSchema: deleteOrganizationTargetAndPayloadSchema,
            responsePayloadSchema: deleteOrgResponsePayloadSchema,
        }
    }
})
export default deleteOrganizationEventContract

export type DeleteOrganizationEventContract = typeof deleteOrganizationEventContract