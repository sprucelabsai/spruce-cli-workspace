import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import eventTargetSchema from '#spruce/schemas/mercuryApi/v2020_12_25/eventTarget.schema'

const unregisterSkillEmitTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.UnregisterSkillEmitTargetAndPayloadSchema  = {
	id: 'unregisterSkillEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'target': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: eventTargetSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(unregisterSkillEmitTargetAndPayloadSchema)

export default unregisterSkillEmitTargetAndPayloadSchema
