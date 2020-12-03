import { buildEventContract } from '@sprucelabs/mercury-types'

const updateOrganizationEventContract = buildEventContract({
    eventSignatures: {
        'update-organization': {}
    }
})
export default updateOrganizationEventContract

export type UpdateOrganizationEventContract = typeof updateOrganizationEventContract