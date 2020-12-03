import { buildEventContract } from '@sprucelabs/mercury-types'

const createLocationEventContract = buildEventContract({
    eventSignatures: {
        'create-location': {}
    }
})
export default createLocationEventContract

export type CreateLocationEventContract = typeof createLocationEventContract