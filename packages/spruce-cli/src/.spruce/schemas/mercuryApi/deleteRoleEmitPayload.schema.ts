import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'



const deleteRoleEmitPayloadSchema: SpruceSchemas.MercuryApi.DeleteRoleEmitPayloadSchema  = {
	id: 'deleteRoleEmitPayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'id': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'organizationId': {
	                type: 'id',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(deleteRoleEmitPayloadSchema)

export default deleteRoleEmitPayloadSchema
