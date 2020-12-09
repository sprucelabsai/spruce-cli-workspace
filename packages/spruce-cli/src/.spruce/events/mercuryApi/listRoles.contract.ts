import { buildEventContract } from '@sprucelabs/mercury-types'

import listRolesTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/listRolesTargetAndPayload.schema"
import listRolesResponsePayloadSchema from "#spruce/schemas/mercuryApi/listRolesResponsePayload.schema"


const listRolesEventContract = buildEventContract({
    eventSignatures: {
        'list-roles': {
            emitPayloadSchema: listRolesTargetAndPayloadSchema,
            responsePayloadSchema: listRolesResponsePayloadSchema,
        }
    }
})
export default listRolesEventContract

export type ListRolesEventContract = typeof listRolesEventContract