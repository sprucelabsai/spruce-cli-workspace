import { buildEventContract } from '@sprucelabs/mercury-types'

import createOrganizationTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/createOrganizationTargetAndPayload.schema"
import createOrgResponsePayloadSchema from "#spruce/schemas/mercuryApi/createOrgResponsePayload.schema"


const createOrganizationEventContract = buildEventContract({
    eventSignatures: {
        'create-organization': {
            emitPayloadSchema: createOrganizationTargetAndPayloadSchema,
            responsePayloadSchema: createOrgResponsePayloadSchema,
        }
    }
})
export default createOrganizationEventContract

export type CreateOrganizationEventContract = typeof createOrganizationEventContract