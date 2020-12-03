import { buildEventContract } from '@sprucelabs/mercury-types'

const createRoleEventContract = buildEventContract({
    eventSignatures: {
        'create-role': {}
    }
})
export default createRoleEventContract

export type CreateRoleEventContract = typeof createRoleEventContract