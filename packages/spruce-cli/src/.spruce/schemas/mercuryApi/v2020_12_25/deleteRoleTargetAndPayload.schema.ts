import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import deleteRoleEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/deleteRoleEmitPayload.schema'
import eventTargetSchema from '#spruce/schemas/mercuryApi/v2020_12_25/eventTarget.schema'

const deleteRoleTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.DeleteRoleTargetAndPayloadSchema  = {
	id: 'deleteRoleTargetAndPayload',
	version: 'v2020_12_25',
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
