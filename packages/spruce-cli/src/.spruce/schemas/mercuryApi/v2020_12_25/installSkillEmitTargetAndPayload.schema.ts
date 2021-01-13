import { SchemaRegistry } from '@sprucelabs/schema'
import eventTargetSchema from '#spruce/schemas/mercuryApi/v2020_12_25/eventTarget.schema'
import installSkillEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/installSkillEmitPayload.schema'
import { SpruceSchemas } from '../../schemas.types'

const installSkillEmitTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.InstallSkillEmitTargetAndPayloadSchema = {
	id: 'installSkillEmitTargetAndPayload',
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
			options: { schema: installSkillEmitPayloadSchema },
		},
	},
}

SchemaRegistry.getInstance().trackSchema(installSkillEmitTargetAndPayloadSchema)

export default installSkillEmitTargetAndPayloadSchema
