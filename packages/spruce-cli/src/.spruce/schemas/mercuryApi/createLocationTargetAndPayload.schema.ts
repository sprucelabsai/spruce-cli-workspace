import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import createLocationEmitPayloadSchema from '#spruce/schemas/mercuryApi/createLocationEmitPayload.schema'
import eventTargetSchema from '#spruce/schemas/mercuryApi/eventTarget.schema'

const createLocationTargetAndPayloadSchema: SpruceSchemas.MercuryApi.CreateLocationTargetAndPayloadSchema  = {
	id: 'createLocationTargetAndPayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: createLocationEmitPayloadSchema,}
	            },
	            /** . */
	            'target': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: eventTargetSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(createLocationTargetAndPayloadSchema)

export default createLocationTargetAndPayloadSchema
