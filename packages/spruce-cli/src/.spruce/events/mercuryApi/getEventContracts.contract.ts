import { buildEventContract } from '@sprucelabs/mercury-types'

import getEventContractsResponsePayloadSchema from "#spruce/schemas/mercuryApi/getEventContractsResponsePayload.schema"


const getEventContractsEventContract = buildEventContract({
    eventSignatures: {
        'get-event-contracts': {
            
            responsePayloadSchema: getEventContractsResponsePayloadSchema,
        }
    }
})
export default getEventContractsEventContract

export type GetEventContractsEventContract = typeof getEventContractsEventContract