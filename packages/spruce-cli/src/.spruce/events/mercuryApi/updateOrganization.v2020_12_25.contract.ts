import { buildEventContract } from '@sprucelabs/mercury-types'

import updateOrganizationTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/updateOrganizationTargetAndPayload.schema"
import updateOrgResponsePayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/updateOrgResponsePayload.schema"


const updateOrganizationEventContract = buildEventContract({
    eventSignatures: {
        'update-organization::v2020_12_25': {
            emitPayloadSchema: updateOrganizationTargetAndPayloadSchema,
            responsePayloadSchema: updateOrgResponsePayloadSchema,
        }
    }
})
export default updateOrganizationEventContract

export type UpdateOrganizationEventContract = typeof updateOrganizationEventContract