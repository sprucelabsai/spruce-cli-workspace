import { buildEventContract } from '@sprucelabs/mercury-types'

import uninstallSkillTargetAndPayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/uninstallSkillTargetAndPayload.schema"
import unInstallSkillResponsePayloadSchema from "#spruce/schemas/mercuryApi/v2020_12_25/unInstallSkillResponsePayload.schema"


const uninstallSkillEventContract = buildEventContract({
    eventSignatures: {
        'uninstall-skill::v2020_12_25': {
            emitPayloadSchema: uninstallSkillTargetAndPayloadSchema,
            responsePayloadSchema: unInstallSkillResponsePayloadSchema,
        }
    }
})
export default uninstallSkillEventContract

export type UninstallSkillEventContract = typeof uninstallSkillEventContract