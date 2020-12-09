import { buildEventContract } from '@sprucelabs/mercury-types'

const deleteOrganizationEventContract = buildEventContract({
    eventSignatures: {
        'delete-organization': {}
    }
})
export default deleteOrganizationEventContract

export type DeleteOrganizationEventContract = typeof deleteOrganizationEventContract