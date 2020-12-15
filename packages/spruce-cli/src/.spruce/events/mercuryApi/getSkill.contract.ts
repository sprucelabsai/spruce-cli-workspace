import { buildEventContract } from '@sprucelabs/mercury-types'

import getSkillTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/getSkillTargetAndPayload.schema"
import getSkillResponsePayloadSchema from "#spruce/schemas/mercuryApi/getSkillResponsePayload.schema"


const getSkillEventContract = buildEventContract({
    eventSignatures: {
        'get-skill': {
            emitPayloadSchema: getSkillTargetAndPayloadSchema,
            responsePayloadSchema: getSkillResponsePayloadSchema,
        }
    }
})
export default getSkillEventContract

export type GetSkillEventContract = typeof getSkillEventContract