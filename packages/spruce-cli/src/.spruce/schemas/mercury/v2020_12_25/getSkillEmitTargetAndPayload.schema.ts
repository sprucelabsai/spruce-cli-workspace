import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import getSkillTargetPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/getSkillTargetPayload.schema'
import getSkillEmitPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/getSkillEmitPayload.schema'

const getSkillEmitTargetAndPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.GetSkillEmitTargetAndPayloadSchema  = {
	id: 'getSkillEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'target': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: getSkillTargetPayloadSchema,}
	            },
	            /** . */
	            'payload': {
	                type: 'schema',
	                options: {schema: getSkillEmitPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(getSkillEmitTargetAndPayloadSchema)

export default getSkillEmitTargetAndPayloadSchema
