import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const doesHonorPermissionContractEmitTargetSchema: SpruceSchemas.Mercury.v2020_12_25.DoesHonorPermissionContractEmitTargetSchema  = {
	id: 'doesHonorPermissionContractEmitTarget',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'personId': {
	                type: 'id',
	                options: undefined
	            },
	            /** . */
	            'organizationId': {
	                type: 'id',
	                options: undefined
	            },
	            /** . */
	            'locationId': {
	                type: 'id',
	                options: undefined
	            },
	            /** . */
	            'skillId': {
	                type: 'id',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(doesHonorPermissionContractEmitTargetSchema)

export default doesHonorPermissionContractEmitTargetSchema
