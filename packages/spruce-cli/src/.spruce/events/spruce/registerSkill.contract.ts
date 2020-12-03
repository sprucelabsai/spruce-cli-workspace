import { buildEventContract } from '@sprucelabs/mercury-types'

const registerSkillEventContract = buildEventContract({
    eventSignatures: {
        'register-skill': {}
    }
})
export default registerSkillEventContract

export type RegisterSkillEventContract = typeof registerSkillEventContract