import { buildEventContract } from '@sprucelabs/mercury-types'

import updateOrganizationTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/updateOrganizationTargetAndPayload.schema"
import updateOrgResponsePayloadSchema from "#spruce/schemas/mercuryApi/updateOrgResponsePayload.schema"


const updateOrganizationEventContract = buildEventContract({
    eventSignatures: {
        'update-organization': {
            emitPayloadSchema: updateOrganizationTargetAndPayloadSchema,
            responsePayloadSchema: updateOrgResponsePayloadSchema,
        }
    }
})
export default updateOrganizationEventContract

export type UpdateOrganizationEventContract = typeof updateOrganizationEventContract