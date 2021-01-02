import { buildEventContract } from '@sprucelabs/mercury-types'

import installSkillTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/installSkillTargetAndPayload.schema"
import installSkillResponsePayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/installSkillResponsePayload.schema"


const installSkillEventContract = buildEventContract({
    eventSignatures: {
        'install-skill::v2020_12_25': {
            emitPayloadSchema: installSkillTargetAndPayloadSchema,
            responsePayloadSchema: installSkillResponsePayloadSchema,
        }
    }
})
export default installSkillEventContract

export type InstallSkillEventContract = typeof installSkillEventContract