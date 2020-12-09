import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import installSkillEmitPayloadSchema from '#spruce/schemas/mercuryApi/installSkillEmitPayload.schema'
import eventTargetSchema from '#spruce/schemas/mercuryApi/eventTarget.schema'

const installSkillTargetAndPayloadSchema: SpruceSchemas.MercuryApi.InstallSkillTargetAndPayloadSchema  = {
	id: 'installSkillTargetAndPayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: installSkillEmitPayloadSchema,}
	            },
	            /** . */
	            'target': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: eventTargetSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(installSkillTargetAndPayloadSchema)

export default installSkillTargetAndPayloadSchema
