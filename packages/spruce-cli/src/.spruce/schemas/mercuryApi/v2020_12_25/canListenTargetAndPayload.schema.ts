import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import canListenEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/canListenEmitPayload.schema'

const canListenTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.CanListenTargetAndPayloadSchema  = {
	id: 'canListenTargetAndPayload',
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

SchemaRegistry.getInstance().trackSchema(canListenTargetAndPayloadSchema)

export default canListenTargetAndPayloadSchema
