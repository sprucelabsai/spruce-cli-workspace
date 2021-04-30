import { buildEventContract } from '@sprucelabs/mercury-types'
import getLocationEmitTargetAndPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/getLocationEmitTargetAndPayload.schema'
import getLocationResponsePayloadSchema from '#spruce/schemas/mercury/v2020_12_25/getLocationResponsePayload.schema'

const getLocationEventContract = buildEventContract({
	eventSignatures: {
		'get-location::v2020_12_25': {
			emitPayloadSchema: getLocationEmitTargetAndPayloadSchema,
			responsePayloadSchema: getLocationResponsePayloadSchema,
		},
	},
})
export default getLocationEventContract

export type GetLocationEventContract = typeof getLocationEventContract
