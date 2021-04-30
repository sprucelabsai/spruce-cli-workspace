import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const getRoleEmitPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.GetRoleEmitPayloadSchema  = {
	id: 'getRoleEmitPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
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
