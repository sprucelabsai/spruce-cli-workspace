import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import eventTargetSchema from '#spruce/schemas/mercuryApi/v2020_12_25/eventTarget.schema'
import createRoleEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/createRoleEmitPayload.schema'

const createRoleEmitTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.CreateRoleEmitTargetAndPayloadSchema  = {
	id: 'createRoleEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
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
	                options: {schema: createRoleEmitPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(createRoleEmitTargetAndPayloadSchema)

export default createRoleEmitTargetAndPayloadSchema
