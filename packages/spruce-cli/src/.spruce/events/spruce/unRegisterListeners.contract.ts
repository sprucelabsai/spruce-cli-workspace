import { buildEventContract } from '@sprucelabs/mercury-types'

const unRegisterListenersEventContract = buildEventContract({
    eventSignatures: {
        'un-register-listeners': {}
    }
})
export default unRegisterListenersEventContract

export type UnRegisterListenersEventContract = typeof unRegisterListenersEventContract