import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import registerSkillEmitPayloadSchema from '#spruce/schemas/mercuryApi/registerSkillEmitPayload.schema'

const registerSkillTargetAndPayloadSchema: SpruceSchemas.MercuryApi.RegisterSkillTargetAndPayloadSchema  = {
	id: 'registerSkillTargetAndPayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: registerSkillEmitPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(registerSkillTargetAndPayloadSchema)

export default registerSkillTargetAndPayloadSchema
