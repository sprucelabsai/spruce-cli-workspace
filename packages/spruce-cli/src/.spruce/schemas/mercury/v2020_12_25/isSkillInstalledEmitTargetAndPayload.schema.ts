import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import isSkillInstalledTargetPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/isSkillInstalledTargetPayload.schema'
import isSkillInstalledEmitPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/isSkillInstalledEmitPayload.schema'

const isSkillInstalledEmitTargetAndPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.IsSkillInstalledEmitTargetAndPayloadSchema  = {
	id: 'isSkillInstalledEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'target': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: isSkillInstalledTargetPayloadSchema,}
	            },
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: isSkillInstalledEmitPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(isSkillInstalledEmitTargetAndPayloadSchema)

export default isSkillInstalledEmitTargetAndPayloadSchema
