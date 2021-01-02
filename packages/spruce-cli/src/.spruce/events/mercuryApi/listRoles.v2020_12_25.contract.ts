import { buildEventContract } from '@sprucelabs/mercury-types'

import listRolesTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/listRolesTargetAndPayload.schema"
import listRolesResponsePayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/listRolesResponsePayload.schema"


const listRolesEventContract = buildEventContract({
    eventSignatures: {
        'list-roles::v2020_12_25': {
            emitPayloadSchema: listRolesTargetAndPayloadSchema,
            responsePayloadSchema: listRolesResponsePayloadSchema,
        }
    }
})
export default listRolesEventContract

export type ListRolesEventContract = typeof listRolesEventContract