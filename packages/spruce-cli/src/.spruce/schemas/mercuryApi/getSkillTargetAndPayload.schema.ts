import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import getSkillEmitPayloadSchema from '#spruce/schemas/mercuryApi/getSkillEmitPayload.schema'

const getSkillTargetAndPayloadSchema: SpruceSchemas.MercuryApi.GetSkillTargetAndPayloadSchema  = {
	id: 'getSkillTargetAndPayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: getSkillEmitPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(getSkillTargetAndPayloadSchema)

export default getSkillTargetAndPayloadSchema
