import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const listRolesEmitPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.ListRolesEmitPayloadSchema  = {
	id: 'listRolesEmitPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'includePrivateRoles': {
	                type: 'boolean',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(listRolesEmitPayloadSchema)

export default listRolesEmitPayloadSchema
