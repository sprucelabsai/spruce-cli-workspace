import { buildEventContract } from '@sprucelabs/mercury-types'

import isSkillInstalledTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/isSkillInstalledTargetAndPayload.schema"
import isSkillInstalledResponsePayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/isSkillInstalledResponsePayload.schema"


const isSkillInstalledEventContract = buildEventContract({
    eventSignatures: {
        'is-skill-installed::v2020_12_25': {
            emitPayloadSchema: isSkillInstalledTargetAndPayloadSchema,
            responsePayloadSchema: isSkillInstalledResponsePayloadSchema,
        }
    }
})
export default isSkillInstalledEventContract

export type IsSkillInstalledEventContract = typeof isSkillInstalledEventContract