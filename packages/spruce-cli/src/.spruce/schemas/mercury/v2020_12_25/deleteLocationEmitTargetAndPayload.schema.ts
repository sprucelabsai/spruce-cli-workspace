import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import eventTargetSchema from '#spruce/schemas/mercury/v2020_12_25/eventTarget.schema'
import deleteLocationEmitPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/deleteLocationEmitPayload.schema'

const deleteLocationEmitTargetAndPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.DeleteLocationEmitTargetAndPayloadSchema  = {
	id: 'deleteLocationEmitTargetAndPayload',
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
	                isRequired: true,
	                options: {schema: deleteLocationEmitPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(deleteLocationEmitTargetAndPayloadSchema)

export default deleteLocationEmitTargetAndPayloadSchema
