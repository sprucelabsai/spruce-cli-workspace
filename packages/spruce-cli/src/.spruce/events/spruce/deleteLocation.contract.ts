import { buildEventContract } from '@sprucelabs/mercury-types'

const deleteLocationEventContract = buildEventContract({
    eventSignatures: {
        'delete-location': {}
    }
})
export default deleteLocationEventContract

export type DeleteLocationEventContract = typeof deleteLocationEventContract