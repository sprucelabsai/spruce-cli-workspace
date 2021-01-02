import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import deleteLocationEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/deleteLocationEmitPayload.schema'
import eventTargetSchema from '#spruce/schemas/mercuryApi/v2020_12_25/eventTarget.schema'

const deleteLocationTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.DeleteLocationTargetAndPayloadSchema  = {
	id: 'deleteLocationTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: deleteLocationEmitPayloadSchema,}
	            },
	            /** . */
	            'target': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: eventTargetSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(deleteLocationTargetAndPayloadSchema)

export default deleteLocationTargetAndPayloadSchema
