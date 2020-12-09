import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import deleteRoleEmitPayloadSchema from '#spruce/schemas/mercuryApi/deleteRoleEmitPayload.schema'
import eventTargetSchema from '#spruce/schemas/mercuryApi/eventTarget.schema'

const deleteRoleTargetAndPayloadSchema: SpruceSchemas.MercuryApi.DeleteRoleTargetAndPayloadSchema  = {
	id: 'deleteRoleTargetAndPayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: deleteRoleEmitPayloadSchema,}
	            },
	            /** . */
	            'target': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: eventTargetSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(deleteRoleTargetAndPayloadSchema)

export default deleteRoleTargetAndPayloadSchema
