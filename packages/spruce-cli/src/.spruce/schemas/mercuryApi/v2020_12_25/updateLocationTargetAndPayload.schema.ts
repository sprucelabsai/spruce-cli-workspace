import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import updateLocationEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/updateLocationEmitPayload.schema'
import eventTargetSchema from '#spruce/schemas/mercuryApi/v2020_12_25/eventTarget.schema'

const updateLocationTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.UpdateLocationTargetAndPayloadSchema  = {
	id: 'updateLocationTargetAndPayload',
	version: 'v2020_12_25',
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
