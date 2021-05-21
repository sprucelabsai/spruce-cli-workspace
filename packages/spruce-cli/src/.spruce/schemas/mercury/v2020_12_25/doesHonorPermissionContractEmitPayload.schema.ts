import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const doesHonorPermissionContractEmitPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.DoesHonorPermissionContractEmitPayloadSchema  = {
	id: 'doesHonorPermissionContractEmitPayload',
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

SchemaRegistry.getInstance().trackSchema(doesHonorPermissionContractEmitPayloadSchema)

export default doesHonorPermissionContractEmitPayloadSchema
