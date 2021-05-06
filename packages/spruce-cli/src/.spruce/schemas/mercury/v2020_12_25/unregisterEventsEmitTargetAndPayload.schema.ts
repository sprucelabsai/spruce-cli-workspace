import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import unregisterEventsEmitPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/unregisterEventsEmitPayload.schema'

const unregisterEventsEmitTargetAndPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.UnregisterEventsEmitTargetAndPayloadSchema  = {
	id: 'unregisterEventsEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'payload': {
	                type: 'schema',
	                options: {schema: unregisterEventsEmitPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(unregisterEventsEmitTargetAndPayloadSchema)

export default unregisterEventsEmitTargetAndPayloadSchema
