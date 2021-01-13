import { SchemaRegistry } from '@sprucelabs/schema'
import getSkillEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/getSkillEmitPayload.schema'
import { SpruceSchemas } from '../../schemas.types'

const getSkillEmitTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.GetSkillEmitTargetAndPayloadSchema = {
	id: 'getSkillEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	fields: {
		/** . */
		payload: {
			type: 'schema',
			isRequired: true,
			options: { schema: getSkillEmitPayloadSchema },
		},
	},
}

SchemaRegistry.getInstance().trackSchema(getSkillEmitTargetAndPayloadSchema)

export default getSkillEmitTargetAndPayloadSchema
