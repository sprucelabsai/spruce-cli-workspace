import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import eventTargetSchema from '#spruce/schemas/mercury/v2020_12_25/eventTarget.schema'
import deleteRoleEmitPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/deleteRoleEmitPayload.schema'

const deleteRoleEmitTargetAndPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.DeleteRoleEmitTargetAndPayloadSchema  = {
	id: 'deleteRoleEmitTargetAndPayload',
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
	                options: {schema: deleteRoleEmitPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(deleteRoleEmitTargetAndPayloadSchema)

export default deleteRoleEmitTargetAndPayloadSchema
