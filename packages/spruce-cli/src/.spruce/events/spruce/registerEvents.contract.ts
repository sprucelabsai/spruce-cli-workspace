import { buildEventContract } from '@sprucelabs/mercury-types'

const registerEventsEventContract = buildEventContract({
    eventSignatures: {
        'register-events': {}
    }
})
export default registerEventsEventContract

export type RegisterEventsEventContract = typeof registerEventsEventContract