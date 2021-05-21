import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const updateRoleEmitTargetSchema: SpruceSchemas.Mercury.v2020_12_25.UpdateRoleEmitTargetSchema  = {
	id: 'updateRoleEmitTarget',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'roleId': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(updateRoleEmitTargetSchema)

export default updateRoleEmitTargetSchema
