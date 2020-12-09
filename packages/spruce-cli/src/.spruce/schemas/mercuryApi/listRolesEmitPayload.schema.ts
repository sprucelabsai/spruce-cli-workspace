import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'



const listRolesEmitPayloadSchema: SpruceSchemas.MercuryApi.ListRolesEmitPayloadSchema  = {
	id: 'listRolesEmitPayload',
	namespace: 'MercuryApi',
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
