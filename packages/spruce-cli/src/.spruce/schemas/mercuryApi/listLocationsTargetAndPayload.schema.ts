import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import listLocationsEmitPayloadSchema from '#spruce/schemas/mercuryApi/listLocationsEmitPayload.schema'
import eventTargetSchema from '#spruce/schemas/mercuryApi/eventTarget.schema'

const listLocationsTargetAndPayloadSchema: SpruceSchemas.MercuryApi.ListLocationsTargetAndPayloadSchema  = {
	id: 'listLocationsTargetAndPayload',
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
