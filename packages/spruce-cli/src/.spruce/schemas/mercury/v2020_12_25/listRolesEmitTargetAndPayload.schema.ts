import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import listRolesTargetPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/listRolesTargetPayload.schema'
import listRolesEmitPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/listRolesEmitPayload.schema'

const listRolesEmitTargetAndPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.ListRolesEmitTargetAndPayloadSchema  = {
	id: 'listRolesEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'target': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: listRolesTargetPayloadSchema,}
	            },
	            /** . */
	            'payload': {
	                type: 'schema',
	                options: {schema: listRolesEmitPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(listRolesEmitTargetAndPayloadSchema)

export default listRolesEmitTargetAndPayloadSchema
