import { buildEventContract } from '@sprucelabs/mercury-types'

import installSkillTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/installSkillTargetAndPayload.schema"
import installSkillResponsePayloadSchema from "#spruce/schemas/mercuryApi/installSkillResponsePayload.schema"


const installSkillEventContract = buildEventContract({
    eventSignatures: {
        'install-skill': {
            emitPayloadSchema: installSkillTargetAndPayloadSchema,
            responsePayloadSchema: installSkillResponsePayloadSchema,
        }
    }
})
export default installSkillEventContract

export type InstallSkillEventContract = typeof installSkillEventContract