import { buildEventContract } from '@sprucelabs/mercury-types'

const listLocationsEventContract = buildEventContract({
    eventSignatures: {
        'list-locations': {}
    }
})
export default listLocationsEventContract

export type ListLocationsEventContract = typeof listLocationsEventContract