import { SchemaRegistry } from '@sprucelabs/schema'
import skillSchema from '#spruce/schemas/spruce/v2020_07_22/skill.schema'
import { SpruceSchemas } from '../../schemas.types'

const registerSkillResponsePayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.RegisterSkillResponsePayloadSchema = {
	id: 'registerSkillResponsePayload',
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

SchemaRegistry.getInstance().trackSchema(registerSkillResponsePayloadSchema)

export default registerSkillResponsePayloadSchema
