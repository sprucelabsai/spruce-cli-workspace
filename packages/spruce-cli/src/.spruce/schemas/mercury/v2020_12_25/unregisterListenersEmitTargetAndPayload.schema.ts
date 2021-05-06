import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import unregisterListenersEmitPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/unregisterListenersEmitPayload.schema'

const unregisterListenersEmitTargetAndPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.UnregisterListenersEmitTargetAndPayloadSchema  = {
	id: 'unregisterListenersEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'payload': {
	                type: 'schema',
	                options: {schema: unregisterListenersEmitPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(unregisterListenersEmitTargetAndPayloadSchema)

export default unregisterListenersEmitTargetAndPayloadSchema
