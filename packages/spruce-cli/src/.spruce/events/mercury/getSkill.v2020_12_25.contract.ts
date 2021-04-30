import { buildEventContract } from '@sprucelabs/mercury-types'
import getSkillEmitTargetAndPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/getSkillEmitTargetAndPayload.schema'
import getSkillResponsePayloadSchema from '#spruce/schemas/mercury/v2020_12_25/getSkillResponsePayload.schema'

const getSkillEventContract = buildEventContract({
	eventSignatures: {
		'get-skill::v2020_12_25': {
			emitPayloadSchema: getSkillEmitTargetAndPayloadSchema,
			responsePayloadSchema: getSkillResponsePayloadSchema,
		},
	},
})
export default getSkillEventContract

export type GetSkillEventContract = typeof getSkillEventContract
