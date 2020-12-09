import { buildEventContract } from '@sprucelabs/mercury-types'

const unRegisterEventsEventContract = buildEventContract({
    eventSignatures: {
        'un-register-events': {}
    }
})
export default unRegisterEventsEventContract

export type UnRegisterEventsEventContract = typeof unRegisterEventsEventContract