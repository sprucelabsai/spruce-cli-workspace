import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import roleSchema from '#spruce/schemas/spruce/v2020_07_22/role.schema'

const deleteRoleResponsePayloadSchema: SpruceSchemas.Mercury.v2020_12_25.DeleteRoleResponsePayloadSchema  = {
	id: 'deleteRoleResponsePayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'role': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: roleSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(deleteRoleResponsePayloadSchema)

export default deleteRoleResponsePayloadSchema
