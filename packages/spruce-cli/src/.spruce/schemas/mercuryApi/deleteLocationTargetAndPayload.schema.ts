import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import deleteLocationEmitPayloadSchema from '#spruce/schemas/mercuryApi/deleteLocationEmitPayload.schema'
import eventTargetSchema from '#spruce/schemas/mercuryApi/eventTarget.schema'

const deleteLocationTargetAndPayloadSchema: SpruceSchemas.MercuryApi.DeleteLocationTargetAndPayloadSchema  = {
	id: 'deleteLocationTargetAndPayload',
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
