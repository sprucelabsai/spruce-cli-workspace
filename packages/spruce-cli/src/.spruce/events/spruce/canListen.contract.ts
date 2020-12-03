import { buildEventContract } from '@sprucelabs/mercury-types'

const canListenEventContract = buildEventContract({
    eventSignatures: {
        'can-listen': {}
    }
})
export default canListenEventContract

export type CanListenEventContract = typeof canListenEventContract