import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import eventTargetSchema from '#spruce/schemas/mercury/v2020_12_25/eventTarget.schema'
import listLocationsEmitPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/listLocationsEmitPayload.schema'

const listLocationsEmitTargetAndPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.ListLocationsEmitTargetAndPayloadSchema  = {
	id: 'listLocationsEmitTargetAndPayload',
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
	                options: {schema: listLocationsEmitPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(listLocationsEmitTargetAndPayloadSchema)

export default listLocationsEmitTargetAndPayloadSchema
