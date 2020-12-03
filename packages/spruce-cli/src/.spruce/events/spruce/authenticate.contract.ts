import { buildEventContract } from '@sprucelabs/mercury-types'

const authenticateEventContract = buildEventContract({
    eventSignatures: {
        'authenticate': {}
    }
})
export default authenticateEventContract

export type AuthenticateEventContract = typeof authenticateEventContract