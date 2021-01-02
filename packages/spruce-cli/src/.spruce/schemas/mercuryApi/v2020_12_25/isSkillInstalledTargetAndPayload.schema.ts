import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import isSkillInstalledEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/isSkillInstalledEmitPayload.schema'
import eventTargetSchema from '#spruce/schemas/mercuryApi/v2020_12_25/eventTarget.schema'

const isSkillInstalledTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.IsSkillInstalledTargetAndPayloadSchema  = {
	id: 'isSkillInstalledTargetAndPayload',
	version: 'v2020_12_25',
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
