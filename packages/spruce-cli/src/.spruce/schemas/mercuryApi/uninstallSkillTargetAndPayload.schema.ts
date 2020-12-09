import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import unInstallSkillEmitPayloadSchema from '#spruce/schemas/mercuryApi/unInstallSkillEmitPayload.schema'
import eventTargetSchema from '#spruce/schemas/mercuryApi/eventTarget.schema'

const uninstallSkillTargetAndPayloadSchema: SpruceSchemas.MercuryApi.UninstallSkillTargetAndPayloadSchema  = {
	id: 'uninstallSkillTargetAndPayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: unInstallSkillEmitPayloadSchema,}
	            },
	            /** . */
	            'target': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: eventTargetSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(uninstallSkillTargetAndPayloadSchema)

export default uninstallSkillTargetAndPayloadSchema
