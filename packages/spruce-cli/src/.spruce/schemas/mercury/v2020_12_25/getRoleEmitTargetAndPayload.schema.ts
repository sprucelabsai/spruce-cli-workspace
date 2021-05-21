import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import getRoleEmitTargetSchema from '#spruce/schemas/mercury/v2020_12_25/getRoleEmitTarget.schema'

const getRoleEmitTargetAndPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.GetRoleEmitTargetAndPayloadSchema  = {
	id: 'getRoleEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'target': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: getRoleEmitTargetSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(getRoleEmitTargetAndPayloadSchema)

export default getRoleEmitTargetAndPayloadSchema
