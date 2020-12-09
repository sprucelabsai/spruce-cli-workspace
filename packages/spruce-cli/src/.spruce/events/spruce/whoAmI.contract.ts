import { buildEventContract } from '@sprucelabs/mercury-types'

const whoAmIEventContract = buildEventContract({
    eventSignatures: {
        'who-am-i': {}
    }
})
export default whoAmIEventContract

export type WhoAmIEventContract = typeof whoAmIEventContract