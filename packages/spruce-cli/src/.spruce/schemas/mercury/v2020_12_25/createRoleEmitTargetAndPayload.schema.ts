import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import createRoleTargetPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/createRoleTargetPayload.schema'
import createRoleEmitPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/createRoleEmitPayload.schema'

const createRoleEmitTargetAndPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.CreateRoleEmitTargetAndPayloadSchema  = {
	id: 'createRoleEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'target': {
	                type: 'schema',
	                options: {schema: createRoleTargetPayloadSchema,}
	            },
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: createRoleEmitPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(createRoleEmitTargetAndPayloadSchema)

export default createRoleEmitTargetAndPayloadSchema
