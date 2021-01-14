import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import canListenEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/canListenEmitPayload.schema'

const canListenEmitTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.CanListenEmitTargetAndPayloadSchema  = {
	id: 'canListenEmitTargetAndPayload',
	version: 'v2020_12_25',
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

SchemaRegistry.getInstance().trackSchema(canListenEmitTargetAndPayloadSchema)

export default canListenEmitTargetAndPayloadSchema
