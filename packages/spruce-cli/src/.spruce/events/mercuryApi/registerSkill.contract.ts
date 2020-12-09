import { buildEventContract } from '@sprucelabs/mercury-types'

import registerSkillTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/registerSkillTargetAndPayload.schema"
import registerSkillResponsePayloadSchema from "#spruce/schemas/mercuryApi/registerSkillResponsePayload.schema"


const registerSkillEventContract = buildEventContract({
    eventSignatures: {
        'register-skill': {
            emitPayloadSchema: registerSkillTargetAndPayloadSchema,
            responsePayloadSchema: registerSkillResponsePayloadSchema,
        }
    }
})
export default registerSkillEventContract

export type RegisterSkillEventContract = typeof registerSkillEventContract