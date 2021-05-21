import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const listRolesTargetPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.ListRolesTargetPayloadSchema  = {
	id: 'listRolesTargetPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'organizationId': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(listRolesTargetPayloadSchema)

export default listRolesTargetPayloadSchema
