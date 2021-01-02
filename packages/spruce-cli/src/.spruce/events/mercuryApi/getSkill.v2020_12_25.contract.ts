import { buildEventContract } from '@sprucelabs/mercury-types'

import getSkillTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/getSkillTargetAndPayload.schema"
import getSkillResponsePayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/getSkillResponsePayload.schema"


const getSkillEventContract = buildEventContract({
    eventSignatures: {
        'get-skill::v2020_12_25': {
            emitPayloadSchema: getSkillTargetAndPayloadSchema,
            responsePayloadSchema: getSkillResponsePayloadSchema,
        }
    }
})
export default getSkillEventContract

export type GetSkillEventContract = typeof getSkillEventContract