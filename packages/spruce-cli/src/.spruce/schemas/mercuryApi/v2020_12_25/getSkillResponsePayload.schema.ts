import { SchemaRegistry } from '@sprucelabs/schema'
import skillSchema from '#spruce/schemas/spruce/v2020_07_22/skill.schema'
import { SpruceSchemas } from '../../schemas.types'

const getSkillResponsePayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.GetSkillResponsePayloadSchema = {
	id: 'getSkillResponsePayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	fields: {
		/** . */
		skill: {
			type: 'schema',
			isRequired: true,
			options: { schema: skillSchema },
		},
	},
}

SchemaRegistry.getInstance().trackSchema(getSkillResponsePayloadSchema)

export default getSkillResponsePayloadSchema
