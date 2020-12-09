import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import roleSchema from '#spruce/schemas/spruce/v2020_07_22/role.schema'

const getRoleResponsePayloadSchema: SpruceSchemas.MercuryApi.GetRoleResponsePayloadSchema  = {
	id: 'getRoleResponsePayload',
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

SchemaRegistry.getInstance().trackSchema(getRoleResponsePayloadSchema)

export default getRoleResponsePayloadSchema
