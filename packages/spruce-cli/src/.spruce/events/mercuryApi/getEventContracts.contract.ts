import { buildEventContract } from '@sprucelabs/mercury-types'



const getEventContractsEventContract = buildEventContract({
    eventSignatures: {
        'get-event-contracts': {
            
            
        }
    }
})
export default getEventContractsEventContract

export type GetEventContractsEventContract = typeof getEventContractsEventContract