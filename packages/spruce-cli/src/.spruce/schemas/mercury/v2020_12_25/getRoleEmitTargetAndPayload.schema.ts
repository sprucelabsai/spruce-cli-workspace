import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import eventTargetSchema from '#spruce/schemas/mercury/v2020_12_25/eventTarget.schema'
import getRoleEmitPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/getRoleEmitPayload.schema'

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
	                options: {schema: eventTargetSchema,}
	            },
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: getRoleEmitPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(getRoleEmitTargetAndPayloadSchema)

export default getRoleEmitTargetAndPayloadSchema
