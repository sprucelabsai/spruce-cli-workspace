import { buildEventContract } from '@sprucelabs/mercury-types'

import createOrganizationTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/createOrganizationTargetAndPayload.schema"
import createOrgResponsePayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/createOrgResponsePayload.schema"


const createOrganizationEventContract = buildEventContract({
    eventSignatures: {
        'create-organization::v2020_12_25': {
            emitPayloadSchema: createOrganizationTargetAndPayloadSchema,
            responsePayloadSchema: createOrgResponsePayloadSchema,
        }
    }
})
export default createOrganizationEventContract

export type CreateOrganizationEventContract = typeof createOrganizationEventContract