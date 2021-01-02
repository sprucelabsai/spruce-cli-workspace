import { buildEventContract } from '@sprucelabs/mercury-types'

import getOrganizationTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/getOrganizationTargetAndPayload.schema"
import getOrgResponsePayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/getOrgResponsePayload.schema"


const getOrganizationEventContract = buildEventContract({
    eventSignatures: {
        'get-organization::v2020_12_25': {
            emitPayloadSchema: getOrganizationTargetAndPayloadSchema,
            responsePayloadSchema: getOrgResponsePayloadSchema,
        }
    }
})
export default getOrganizationEventContract

export type GetOrganizationEventContract = typeof getOrganizationEventContract