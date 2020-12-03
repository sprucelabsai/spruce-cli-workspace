import { buildEventContract } from '@sprucelabs/mercury-types'

const scrambleAccountEventContract = buildEventContract({
    eventSignatures: {
        'scramble-account': {}
    }
})
export default scrambleAccountEventContract

export type ScrambleAccountEventContract = typeof scrambleAccountEventContract