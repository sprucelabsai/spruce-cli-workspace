import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import eventTargetSchema from '#spruce/schemas/mercuryApi/v2020_12_25/eventTarget.schema'
import isSkillInstalledEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/isSkillInstalledEmitPayload.schema'

const isSkillInstalledEmitTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.IsSkillInstalledEmitTargetAndPayloadSchema  = {
	id: 'isSkillInstalledEmitTargetAndPayload',
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
