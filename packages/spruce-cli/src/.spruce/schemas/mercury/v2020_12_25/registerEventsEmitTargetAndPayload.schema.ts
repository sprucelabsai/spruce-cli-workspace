import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import registerEventsEmitPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/registerEventsEmitPayload.schema'

const registerEventsEmitTargetAndPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.RegisterEventsEmitTargetAndPayloadSchema  = {
	id: 'registerEventsEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: registerEventsEmitPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(registerEventsEmitTargetAndPayloadSchema)

export default registerEventsEmitTargetAndPayloadSchema
