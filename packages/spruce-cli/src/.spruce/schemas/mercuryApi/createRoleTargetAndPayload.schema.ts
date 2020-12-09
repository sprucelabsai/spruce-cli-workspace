import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import createRoleEmitPayloadSchema from '#spruce/schemas/mercuryApi/createRoleEmitPayload.schema'
import eventTargetSchema from '#spruce/schemas/mercuryApi/eventTarget.schema'

const createRoleTargetAndPayloadSchema: SpruceSchemas.MercuryApi.CreateRoleTargetAndPayloadSchema  = {
	id: 'createRoleTargetAndPayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: createRoleEmitPayloadSchema,}
	            },
	            /** . */
	            'target': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: eventTargetSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(createRoleTargetAndPayloadSchema)

export default createRoleTargetAndPayloadSchema
