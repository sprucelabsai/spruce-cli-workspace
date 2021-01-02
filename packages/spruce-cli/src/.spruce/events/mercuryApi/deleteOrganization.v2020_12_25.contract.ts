import { buildEventContract } from '@sprucelabs/mercury-types'

import deleteOrganizationTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/deleteOrganizationTargetAndPayload.schema"
import deleteOrgResponsePayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/deleteOrgResponsePayload.schema"


const deleteOrganizationEventContract = buildEventContract({
    eventSignatures: {
        'delete-organization::v2020_12_25': {
            emitPayloadSchema: deleteOrganizationTargetAndPayloadSchema,
            responsePayloadSchema: deleteOrgResponsePayloadSchema,
        }
    }
})
export default deleteOrganizationEventContract

export type DeleteOrganizationEventContract = typeof deleteOrganizationEventContract