import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import getLocationEmitPayloadSchema from '#spruce/schemas/mercuryApi/getLocationEmitPayload.schema'
import eventTargetSchema from '#spruce/schemas/mercuryApi/eventTarget.schema'

const getLocationTargetAndPayloadSchema: SpruceSchemas.MercuryApi.GetLocationTargetAndPayloadSchema  = {
	id: 'getLocationTargetAndPayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: getLocationEmitPayloadSchema,}
	            },
	            /** . */
	            'target': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: eventTargetSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(getLocationTargetAndPayloadSchema)

export default getLocationTargetAndPayloadSchema
