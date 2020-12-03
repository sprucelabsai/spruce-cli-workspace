import { buildEventContract } from '@sprucelabs/mercury-types'

const confirmPinEventContract = buildEventContract({
    eventSignatures: {
        'confirm-pin': {}
    }
})
export default confirmPinEventContract

export type ConfirmPinEventContract = typeof confirmPinEventContract