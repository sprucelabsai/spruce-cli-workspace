import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import unInstallSkillEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/unInstallSkillEmitPayload.schema'
import eventTargetSchema from '#spruce/schemas/mercuryApi/v2020_12_25/eventTarget.schema'

const uninstallSkillTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.UninstallSkillTargetAndPayloadSchema  = {
	id: 'uninstallSkillTargetAndPayload',
	version: 'v2020_12_25',
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
