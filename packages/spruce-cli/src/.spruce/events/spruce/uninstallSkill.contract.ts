import { buildEventContract } from '@sprucelabs/mercury-types'

const uninstallSkillEventContract = buildEventContract({
    eventSignatures: {
        'uninstall-skill': {}
    }
})
export default uninstallSkillEventContract

export type UninstallSkillEventContract = typeof uninstallSkillEventContract