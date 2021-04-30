import { buildEventContract } from '@sprucelabs/mercury-types'
import listSkillsEmitTargetAndPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/listSkillsEmitTargetAndPayload.schema'
import listSkillsResponsePayloadSchema from '#spruce/schemas/mercury/v2020_12_25/listSkillsResponsePayload.schema'

const listSkillsEventContract = buildEventContract({
	eventSignatures: {
		'list-skills::v2020_12_25': {
			emitPayloadSchema: listSkillsEmitTargetAndPayloadSchema,
			responsePayloadSchema: listSkillsResponsePayloadSchema,
		},
	},
})
export default listSkillsEventContract

export type ListSkillsEventContract = typeof listSkillsEventContract
