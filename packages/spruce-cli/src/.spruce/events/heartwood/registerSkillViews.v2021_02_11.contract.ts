import { buildEventContract } from '@sprucelabs/mercury-types'
import registerSkillViewsEmitTargetAndPayloadSchema from '#spruce/schemas/heartwood/v2021_02_11/registerSkillViewsEmitTargetAndPayload.schema'
import registerSkillViewsResponsePayloadSchema from '#spruce/schemas/heartwood/v2021_02_11/registerSkillViewsResponsePayload.schema'

const registerSkillViewsEventContract = buildEventContract({
	eventSignatures: {
		'heartwood.register-skill-views::v2021_02_11': {
			isGlobal: true,
			emitPayloadSchema: registerSkillViewsEmitTargetAndPayloadSchema,
			responsePayloadSchema: registerSkillViewsResponsePayloadSchema,
		},
	},
})
export default registerSkillViewsEventContract

export type RegisterSkillViewsEventContract =
	typeof registerSkillViewsEventContract
