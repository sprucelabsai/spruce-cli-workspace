import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import skillSchema from '#spruce/schemas/spruce/v2020_07_22/skill.schema'

const registerSkillResponsePayloadSchema: SpruceSchemas.MercuryApi.RegisterSkillResponsePayloadSchema  = {
	id: 'registerSkillResponsePayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'skill': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: skillSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(registerSkillResponsePayloadSchema)

export default registerSkillResponsePayloadSchema
