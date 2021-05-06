import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import eventTargetSchema from '#spruce/schemas/mercury/v2020_12_25/eventTarget.schema'
import updateLocationEmitPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/updateLocationEmitPayload.schema'

const updateLocationEmitTargetAndPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.UpdateLocationEmitTargetAndPayloadSchema  = {
	id: 'updateLocationEmitTargetAndPayload',
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
	                options: {schema: updateLocationEmitPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(updateLocationEmitTargetAndPayloadSchema)

export default updateLocationEmitTargetAndPayloadSchema
