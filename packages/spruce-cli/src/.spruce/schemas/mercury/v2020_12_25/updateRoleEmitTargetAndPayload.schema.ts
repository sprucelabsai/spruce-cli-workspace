import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import eventTargetSchema from '#spruce/schemas/mercury/v2020_12_25/eventTarget.schema'
import updateRoleEmitPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/updateRoleEmitPayload.schema'

const updateRoleEmitTargetAndPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.UpdateRoleEmitTargetAndPayloadSchema  = {
	id: 'updateRoleEmitTargetAndPayload',
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
	                options: {schema: updateRoleEmitPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(updateRoleEmitTargetAndPayloadSchema)

export default updateRoleEmitTargetAndPayloadSchema
