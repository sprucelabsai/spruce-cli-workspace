import { buildEventContract } from '@sprucelabs/mercury-types'

const createOrganizationEventContract = buildEventContract({
    eventSignatures: {
        'create-organization': {}
    }
})
export default createOrganizationEventContract

export type CreateOrganizationEventContract = typeof createOrganizationEventContract