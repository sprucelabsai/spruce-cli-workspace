import { buildEventContract } from '@sprucelabs/mercury-types'

const installSkillEventContract = buildEventContract({
    eventSignatures: {
        'install-skill': {}
    }
})
export default installSkillEventContract

export type InstallSkillEventContract = typeof installSkillEventContract