import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'



const getRoleEmitPayloadSchema: SpruceSchemas.MercuryApi.GetRoleEmitPayloadSchema  = {
	id: 'getRoleEmitPayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'id': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(getRoleEmitPayloadSchema)

export default getRoleEmitPayloadSchema
