import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import roleSchema from '#spruce/schemas/spruce/v2020_07_22/role.schema'

const createRoleResponsePayloadSchema: SpruceSchemas.MercuryApi.CreateRoleResponsePayloadSchema  = {
	id: 'createRoleResponsePayload',
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

SchemaRegistry.getInstance().trackSchema(createRoleResponsePayloadSchema)

export default createRoleResponsePayloadSchema
