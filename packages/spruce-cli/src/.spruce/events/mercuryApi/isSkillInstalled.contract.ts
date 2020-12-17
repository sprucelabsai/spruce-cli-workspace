import { buildEventContract } from '@sprucelabs/mercury-types'

import isSkillInstalledTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/isSkillInstalledTargetAndPayload.schema"
import isSkillInstalledResponsePayloadSchema from "#spruce/schemas/mercuryApi/isSkillInstalledResponsePayload.schema"


const isSkillInstalledEventContract = buildEventContract({
    eventSignatures: {
        'is-skill-installed': {
            emitPayloadSchema: isSkillInstalledTargetAndPayloadSchema,
            responsePayloadSchema: isSkillInstalledResponsePayloadSchema,
        }
    }
})
export default isSkillInstalledEventContract

export type IsSkillInstalledEventContract = typeof isSkillInstalledEventContract