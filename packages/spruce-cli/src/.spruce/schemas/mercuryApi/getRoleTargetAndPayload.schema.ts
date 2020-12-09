import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import getRoleEmitPayloadSchema from '#spruce/schemas/mercuryApi/getRoleEmitPayload.schema'
import eventTargetSchema from '#spruce/schemas/mercuryApi/eventTarget.schema'

const getRoleTargetAndPayloadSchema: SpruceSchemas.MercuryApi.GetRoleTargetAndPayloadSchema  = {
	id: 'getRoleTargetAndPayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: getRoleEmitPayloadSchema,}
	            },
	            /** . */
	            'target': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: eventTargetSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(getRoleTargetAndPayloadSchema)

export default getRoleTargetAndPayloadSchema
