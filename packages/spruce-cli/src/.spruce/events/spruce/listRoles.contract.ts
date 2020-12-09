import { buildEventContract } from '@sprucelabs/mercury-types'

const listRolesEventContract = buildEventContract({
    eventSignatures: {
        'list-roles': {}
    }
})
export default listRolesEventContract

export type ListRolesEventContract = typeof listRolesEventContract