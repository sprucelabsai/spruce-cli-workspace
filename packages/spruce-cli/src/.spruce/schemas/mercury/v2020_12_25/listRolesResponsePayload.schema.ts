import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import roleSchema from '#spruce/schemas/spruce/v2020_07_22/role.schema'

const listRolesResponsePayloadSchema: SpruceSchemas.Mercury.v2020_12_25.ListRolesResponsePayloadSchema  = {
	id: 'listRolesResponsePayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
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
