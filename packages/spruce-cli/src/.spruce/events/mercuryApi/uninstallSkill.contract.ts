import { buildEventContract } from '@sprucelabs/mercury-types'

import uninstallSkillTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/uninstallSkillTargetAndPayload.schema"
import unInstallSkillResponsePayloadSchema from "#spruce/schemas/mercuryApi/unInstallSkillResponsePayload.schema"


const uninstallSkillEventContract = buildEventContract({
    eventSignatures: {
        'uninstall-skill': {
            emitPayloadSchema: uninstallSkillTargetAndPayloadSchema,
            responsePayloadSchema: unInstallSkillResponsePayloadSchema,
        }
    }
})
export default uninstallSkillEventContract

export type UninstallSkillEventContract = typeof uninstallSkillEventContract