import { buildEventContract } from '@sprucelabs/mercury-types'
import installSkillEmitTargetAndPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/installSkillEmitTargetAndPayload.schema'
import installSkillResponsePayloadSchema from '#spruce/schemas/mercury/v2020_12_25/installSkillResponsePayload.schema'

const installSkillEventContract = buildEventContract({
	eventSignatures: {
		'install-skill::v2020_12_25': {
			emitPayloadSchema: installSkillEmitTargetAndPayloadSchema,
			responsePayloadSchema: installSkillResponsePayloadSchema,
		},
	},
})
export default installSkillEventContract

export type InstallSkillEventContract = typeof installSkillEventContract
