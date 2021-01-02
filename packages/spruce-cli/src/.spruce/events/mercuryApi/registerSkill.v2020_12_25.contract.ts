import { buildEventContract } from '@sprucelabs/mercury-types'

import registerSkillTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/registerSkillTargetAndPayload.schema"
import registerSkillResponsePayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/registerSkillResponsePayload.schema"


const registerSkillEventContract = buildEventContract({
    eventSignatures: {
        'register-skill::v2020_12_25': {
            emitPayloadSchema: registerSkillTargetAndPayloadSchema,
            responsePayloadSchema: registerSkillResponsePayloadSchema,
        }
    }
})
export default registerSkillEventContract

export type RegisterSkillEventContract = typeof registerSkillEventContract