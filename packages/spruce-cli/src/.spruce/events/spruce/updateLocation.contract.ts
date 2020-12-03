import { buildEventContract } from '@sprucelabs/mercury-types'

const updateLocationEventContract = buildEventContract({
    eventSignatures: {
        'update-location': {}
    }
})
export default updateLocationEventContract

export type UpdateLocationEventContract = typeof updateLocationEventContract