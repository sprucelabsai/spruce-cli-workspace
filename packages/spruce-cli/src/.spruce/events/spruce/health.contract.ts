import { buildEventContract } from '@sprucelabs/mercury-types'

const healthEventContract = buildEventContract({
    eventSignatures: {
        'health': {}
    }
})
export default healthEventContract

export type HealthEventContract = typeof healthEventContract