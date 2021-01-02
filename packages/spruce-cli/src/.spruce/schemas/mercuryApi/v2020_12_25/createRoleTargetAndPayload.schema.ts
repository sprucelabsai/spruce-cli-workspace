import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import createRoleEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/createRoleEmitPayload.schema'
import eventTargetSchema from '#spruce/schemas/mercuryApi/v2020_12_25/eventTarget.schema'

const createRoleTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.CreateRoleTargetAndPayloadSchema  = {
	id: 'createRoleTargetAndPayload',
	version: 'v2020_12_25',
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
