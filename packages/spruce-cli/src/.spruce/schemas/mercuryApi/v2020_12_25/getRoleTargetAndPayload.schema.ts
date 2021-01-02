import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import getRoleEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/getRoleEmitPayload.schema'
import eventTargetSchema from '#spruce/schemas/mercuryApi/v2020_12_25/eventTarget.schema'

const getRoleTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.GetRoleTargetAndPayloadSchema  = {
	id: 'getRoleTargetAndPayload',
	version: 'v2020_12_25',
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
