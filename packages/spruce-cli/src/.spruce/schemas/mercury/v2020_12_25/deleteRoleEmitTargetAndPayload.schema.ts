import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import deleteRoleTargetPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/deleteRoleTargetPayload.schema'

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
	                options: {schema: deleteRoleTargetPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(deleteRoleEmitTargetAndPayloadSchema)

export default deleteRoleEmitTargetAndPayloadSchema
