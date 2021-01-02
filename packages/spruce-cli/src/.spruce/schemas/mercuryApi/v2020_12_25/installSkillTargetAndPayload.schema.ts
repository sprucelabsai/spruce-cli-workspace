import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import installSkillEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/installSkillEmitPayload.schema'
import eventTargetSchema from '#spruce/schemas/mercuryApi/v2020_12_25/eventTarget.schema'

const installSkillTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.InstallSkillTargetAndPayloadSchema  = {
	id: 'installSkillTargetAndPayload',
	version: 'v2020_12_25',
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
