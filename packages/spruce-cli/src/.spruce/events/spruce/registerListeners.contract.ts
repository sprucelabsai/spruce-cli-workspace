import { buildEventContract } from '@sprucelabs/mercury-types'

const registerListenersEventContract = buildEventContract({
    eventSignatures: {
        'register-listeners': {}
    }
})
export default registerListenersEventContract

export type RegisterListenersEventContract = typeof registerListenersEventContract