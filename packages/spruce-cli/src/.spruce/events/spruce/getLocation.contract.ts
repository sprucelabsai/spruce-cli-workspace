import { buildEventContract } from '@sprucelabs/mercury-types'

const getLocationEventContract = buildEventContract({
    eventSignatures: {
        'get-location': {}
    }
})
export default getLocationEventContract

export type GetLocationEventContract = typeof getLocationEventContract