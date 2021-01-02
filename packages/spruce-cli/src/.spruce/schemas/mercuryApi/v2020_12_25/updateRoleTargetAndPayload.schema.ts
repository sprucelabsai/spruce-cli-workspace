import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import updateRoleEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/updateRoleEmitPayload.schema'
import eventTargetSchema from '#spruce/schemas/mercuryApi/v2020_12_25/eventTarget.schema'

const updateRoleTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.UpdateRoleTargetAndPayloadSchema  = {
	id: 'updateRoleTargetAndPayload',
	version: 'v2020_12_25',
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
