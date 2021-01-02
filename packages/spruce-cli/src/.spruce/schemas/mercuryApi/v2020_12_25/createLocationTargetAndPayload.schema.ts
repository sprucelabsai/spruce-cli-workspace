import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import createLocationEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/createLocationEmitPayload.schema'
import eventTargetSchema from '#spruce/schemas/mercuryApi/v2020_12_25/eventTarget.schema'

const createLocationTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.CreateLocationTargetAndPayloadSchema  = {
	id: 'createLocationTargetAndPayload',
	version: 'v2020_12_25',
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
