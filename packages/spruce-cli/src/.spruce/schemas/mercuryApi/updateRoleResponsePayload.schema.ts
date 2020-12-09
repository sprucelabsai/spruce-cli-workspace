import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import roleSchema from '#spruce/schemas/spruce/v2020_07_22/role.schema'

const updateRoleResponsePayloadSchema: SpruceSchemas.MercuryApi.UpdateRoleResponsePayloadSchema  = {
	id: 'updateRoleResponsePayload',
	namespace: 'MercuryApi',
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

SchemaRegistry.getInstance().trackSchema(updateRoleResponsePayloadSchema)

export default updateRoleResponsePayloadSchema
