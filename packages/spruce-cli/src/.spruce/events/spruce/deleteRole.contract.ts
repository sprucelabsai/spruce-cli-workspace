import { buildEventContract } from '@sprucelabs/mercury-types'

const deleteRoleEventContract = buildEventContract({
    eventSignatures: {
        'delete-role': {}
    }
})
export default deleteRoleEventContract

export type DeleteRoleEventContract = typeof deleteRoleEventContract