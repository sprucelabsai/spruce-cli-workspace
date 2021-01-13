import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import eventTargetSchema from '#spruce/schemas/mercuryApi/v2020_12_25/eventTarget.schema'
import getLocationEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/getLocationEmitPayload.schema'

const getLocationEmitTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.GetLocationEmitTargetAndPayloadSchema  = {
	id: 'getLocationEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
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
	                options: {schema: getLocationEmitPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(getLocationEmitTargetAndPayloadSchema)

export default getLocationEmitTargetAndPayloadSchema
