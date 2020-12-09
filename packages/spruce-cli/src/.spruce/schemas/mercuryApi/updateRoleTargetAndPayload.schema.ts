import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import updateRoleEmitPayloadSchema from '#spruce/schemas/mercuryApi/updateRoleEmitPayload.schema'
import eventTargetSchema from '#spruce/schemas/mercuryApi/eventTarget.schema'

const updateRoleTargetAndPayloadSchema: SpruceSchemas.MercuryApi.UpdateRoleTargetAndPayloadSchema  = {
	id: 'updateRoleTargetAndPayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: updateRoleEmitPayloadSchema,}
	            },
	            /** . */
	            'target': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: eventTargetSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(updateRoleTargetAndPayloadSchema)

export default updateRoleTargetAndPayloadSchema
