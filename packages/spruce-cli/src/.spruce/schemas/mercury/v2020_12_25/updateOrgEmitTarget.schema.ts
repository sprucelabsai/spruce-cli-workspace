import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const updateOrgEmitTargetSchema: SpruceSchemas.Mercury.v2020_12_25.UpdateOrgEmitTargetSchema  = {
	id: 'updateOrgEmitTarget',
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

SchemaRegistry.getInstance().trackSchema(updateOrgEmitTargetSchema)

export default updateOrgEmitTargetSchema
