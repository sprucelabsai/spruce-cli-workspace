import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import roleSchema from '#spruce/schemas/spruce/v2020_07_22/role.schema'

const listRolesResponsePayloadSchema: SpruceSchemas.MercuryApi.ListRolesResponsePayloadSchema  = {
	id: 'listRolesResponsePayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'roles': {
	                type: 'schema',
	                isRequired: true,
	                isArray: true,
	                options: {schema: roleSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(listRolesResponsePayloadSchema)

export default listRolesResponsePayloadSchema
