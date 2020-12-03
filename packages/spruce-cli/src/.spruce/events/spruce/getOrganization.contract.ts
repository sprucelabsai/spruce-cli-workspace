import { buildEventContract } from '@sprucelabs/mercury-types'

const getOrganizationEventContract = buildEventContract({
    eventSignatures: {
        'get-organization': {}
    }
})
export default getOrganizationEventContract

export type GetOrganizationEventContract = typeof getOrganizationEventContract