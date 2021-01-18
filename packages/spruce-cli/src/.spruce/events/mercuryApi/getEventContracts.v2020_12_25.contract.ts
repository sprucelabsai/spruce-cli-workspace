import { buildEventContract } from '@sprucelabs/mercury-types'
import getEventContractsResponsePayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/getEventContractsResponsePayload.schema'

const getEventContractsEventContract = buildEventContract({
	eventSignatures: {
		'get-event-contracts::v2020_12_25': {
			responsePayloadSchema: getEventContractsResponsePayloadSchema,
		},
	},
})
export default getEventContractsEventContract

export type GetEventContractsEventContract = typeof getEventContractsEventContract
