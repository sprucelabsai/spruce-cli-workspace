import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import isSkillInstalledEmitPayloadSchema from '#spruce/schemas/mercuryApi/isSkillInstalledEmitPayload.schema'
import eventTargetSchema from '#spruce/schemas/mercuryApi/eventTarget.schema'

const isSkillInstalledTargetAndPayloadSchema: SpruceSchemas.MercuryApi.IsSkillInstalledTargetAndPayloadSchema  = {
	id: 'isSkillInstalledTargetAndPayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: isSkillInstalledEmitPayloadSchema,}
	            },
	            /** . */
	            'target': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: eventTargetSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(isSkillInstalledTargetAndPayloadSchema)

export default isSkillInstalledTargetAndPayloadSchema
