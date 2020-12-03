import { buildEventContract } from '@sprucelabs/mercury-types'

const updateRoleEventContract = buildEventContract({
    eventSignatures: {
        'update-role': {}
    }
})
export default updateRoleEventContract

export type UpdateRoleEventContract = typeof updateRoleEventContract