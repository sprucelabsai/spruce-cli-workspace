import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const getRoleEmitTargetSchema: SpruceSchemas.Mercury.v2020_12_25.GetRoleEmitTargetSchema  = {
	id: 'getRoleEmitTarget',
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

SchemaRegistry.getInstance().trackSchema(getRoleEmitTargetSchema)

export default getRoleEmitTargetSchema
