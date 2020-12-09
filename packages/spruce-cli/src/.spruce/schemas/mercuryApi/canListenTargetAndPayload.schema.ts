import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import canListenEmitPayloadSchema from '#spruce/schemas/mercuryApi/canListenEmitPayload.schema'

const canListenTargetAndPayloadSchema: SpruceSchemas.MercuryApi.CanListenTargetAndPayloadSchema  = {
	id: 'canListenTargetAndPayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: canListenEmitPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(canListenTargetAndPayloadSchema)

export default canListenTargetAndPayloadSchema
