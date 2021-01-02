import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import registerSkillEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/registerSkillEmitPayload.schema'

const registerSkillTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.RegisterSkillTargetAndPayloadSchema  = {
	id: 'registerSkillTargetAndPayload',
	version: 'v2020_12_25',
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
