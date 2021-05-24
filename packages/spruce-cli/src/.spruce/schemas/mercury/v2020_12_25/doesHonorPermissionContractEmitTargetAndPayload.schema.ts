import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import doesHonorPermissionContractEmitTargetSchema from '#spruce/schemas/mercury/v2020_12_25/doesHonorPermissionContractEmitTarget.schema'
import doesHonorPermissionContractEmitPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/doesHonorPermissionContractEmitPayload.schema'

const doesHonorPermissionContractEmitTargetAndPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.DoesHonorPermissionContractEmitTargetAndPayloadSchema  = {
	id: 'doesHonorPermissionContractEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'target': {
	                type: 'schema',
	                options: {schema: doesHonorPermissionContractEmitTargetSchema,}
	            },
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: doesHonorPermissionContractEmitPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(doesHonorPermissionContractEmitTargetAndPayloadSchema)

export default doesHonorPermissionContractEmitTargetAndPayloadSchema
