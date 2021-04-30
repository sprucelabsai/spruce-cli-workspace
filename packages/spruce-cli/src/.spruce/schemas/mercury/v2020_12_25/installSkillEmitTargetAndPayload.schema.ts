import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import eventTargetSchema from '#spruce/schemas/mercury/v2020_12_25/eventTarget.schema'
import installSkillEmitPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/installSkillEmitPayload.schema'

const installSkillEmitTargetAndPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.InstallSkillEmitTargetAndPayloadSchema  = {
	id: 'installSkillEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'target': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: eventTargetSchema,}
	            },
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: installSkillEmitPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(installSkillEmitTargetAndPayloadSchema)

export default installSkillEmitTargetAndPayloadSchema
