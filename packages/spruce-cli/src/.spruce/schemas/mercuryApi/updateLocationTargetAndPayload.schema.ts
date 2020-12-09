import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import updateLocationEmitPayloadSchema from '#spruce/schemas/mercuryApi/updateLocationEmitPayload.schema'
import eventTargetSchema from '#spruce/schemas/mercuryApi/eventTarget.schema'

const updateLocationTargetAndPayloadSchema: SpruceSchemas.MercuryApi.UpdateLocationTargetAndPayloadSchema  = {
	id: 'updateLocationTargetAndPayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: updateLocationEmitPayloadSchema,}
	            },
	            /** . */
	            'target': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: eventTargetSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(updateLocationTargetAndPayloadSchema)

export default updateLocationTargetAndPayloadSchema
