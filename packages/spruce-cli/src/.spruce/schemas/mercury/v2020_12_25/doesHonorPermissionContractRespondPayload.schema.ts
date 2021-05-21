import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const doesHonorPermissionContractRespondPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.DoesHonorPermissionContractRespondPayloadSchema  = {
	id: 'doesHonorPermissionContractRespondPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'doesHonor': {
	                type: 'boolean',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(doesHonorPermissionContractRespondPayloadSchema)

export default doesHonorPermissionContractRespondPayloadSchema
