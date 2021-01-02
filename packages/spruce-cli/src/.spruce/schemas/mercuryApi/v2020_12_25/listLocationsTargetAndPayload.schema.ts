import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import listLocationsEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/listLocationsEmitPayload.schema'
import eventTargetSchema from '#spruce/schemas/mercuryApi/v2020_12_25/eventTarget.schema'

const listLocationsTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.ListLocationsTargetAndPayloadSchema  = {
	id: 'listLocationsTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: listLocationsEmitPayloadSchema,}
	            },
	            /** . */
	            'target': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: eventTargetSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(listLocationsTargetAndPayloadSchema)

export default listLocationsTargetAndPayloadSchema
