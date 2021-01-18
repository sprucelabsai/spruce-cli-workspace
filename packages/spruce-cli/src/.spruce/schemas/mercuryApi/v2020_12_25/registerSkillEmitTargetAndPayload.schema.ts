import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import registerSkillEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/registerSkillEmitPayload.schema'

const registerSkillEmitTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.RegisterSkillEmitTargetAndPayloadSchema  = {
	id: 'registerSkillEmitTargetAndPayload',
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

SchemaRegistry.getInstance().trackSchema(registerSkillEmitTargetAndPayloadSchema)

export default registerSkillEmitTargetAndPayloadSchema
