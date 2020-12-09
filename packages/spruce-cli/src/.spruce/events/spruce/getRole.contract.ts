import { buildEventContract } from '@sprucelabs/mercury-types'

const getRoleEventContract = buildEventContract({
    eventSignatures: {
        'get-role': {}
    }
})
export default getRoleEventContract

export type GetRoleEventContract = typeof getRoleEventContract