import { SchemaRegistry } from '@sprucelabs/schema'
import eventTargetSchema from '#spruce/schemas/mercuryApi/v2020_12_25/eventTarget.schema'
import unInstallSkillEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/unInstallSkillEmitPayload.schema'
import { SpruceSchemas } from '../../schemas.types'

const uninstallSkillEmitTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.UninstallSkillEmitTargetAndPayloadSchema = {
	id: 'uninstallSkillEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	fields: {
		/** . */
		target: {
			type: 'schema',
			isRequired: true,
			options: { schema: eventTargetSchema },
		},
		/** . */
		payload: {
			type: 'schema',
			isRequired: true,
			options: { schema: unInstallSkillEmitPayloadSchema },
		},
	},
}

SchemaRegistry.getInstance().trackSchema(
	uninstallSkillEmitTargetAndPayloadSchema
)

export default uninstallSkillEmitTargetAndPayloadSchema
