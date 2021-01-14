import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import unregisterListenersEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/unregisterListenersEmitPayload.schema'

const unregisterListenersEmitTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.UnregisterListenersEmitTargetAndPayloadSchema  = {
	id: 'unregisterListenersEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: unregisterListenersEmitPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(unregisterListenersEmitTargetAndPayloadSchema)

export default unregisterListenersEmitTargetAndPayloadSchema
