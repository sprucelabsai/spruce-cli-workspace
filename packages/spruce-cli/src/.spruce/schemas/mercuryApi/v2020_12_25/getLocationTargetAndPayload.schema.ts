import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import getLocationEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/getLocationEmitPayload.schema'
import eventTargetSchema from '#spruce/schemas/mercuryApi/v2020_12_25/eventTarget.schema'

const getLocationTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.GetLocationTargetAndPayloadSchema  = {
	id: 'getLocationTargetAndPayload',
	version: 'v2020_12_25',
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
