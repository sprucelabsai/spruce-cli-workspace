import { buildEventContract } from '@sprucelabs/mercury-types'

const requestPinEventContract = buildEventContract({
    eventSignatures: {
        'request-pin': {}
    }
})
export default requestPinEventContract

export type RequestPinEventContract = typeof requestPinEventContract