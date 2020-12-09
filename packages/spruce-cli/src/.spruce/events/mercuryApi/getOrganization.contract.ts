import { buildEventContract } from '@sprucelabs/mercury-types'

import getOrganizationTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/getOrganizationTargetAndPayload.schema"
import getOrgResponsePayloadSchema from "#spruce/schemas/mercuryApi/getOrgResponsePayload.schema"


const getOrganizationEventContract = buildEventContract({
    eventSignatures: {
        'get-organization': {
            emitPayloadSchema: getOrganizationTargetAndPayloadSchema,
            responsePayloadSchema: getOrgResponsePayloadSchema,
        }
    }
})
export default getOrganizationEventContract

export type GetOrganizationEventContract = typeof getOrganizationEventContract