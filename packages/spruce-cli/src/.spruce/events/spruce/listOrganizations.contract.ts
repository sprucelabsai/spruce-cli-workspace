import { buildEventContract } from '@sprucelabs/mercury-types'

const listOrganizationsEventContract = buildEventContract({
    eventSignatures: {
        'list-organizations': {}
    }
})
export default listOrganizationsEventContract

export type ListOrganizationsEventContract = typeof listOrganizationsEventContract