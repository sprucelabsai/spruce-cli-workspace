import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import registerEventsEmitPayloadSchema from '#spruce/schemas/mercuryApi/registerEventsEmitPayload.schema'

const registerEventsTargetAndPayloadSchema: SpruceSchemas.MercuryApi.RegisterEventsTargetAndPayloadSchema  = {
	id: 'registerEventsTargetAndPayload',
	namespace: 'MercuryApi',
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

SchemaRegistry.getInstance().trackSchema(registerEventsTargetAndPayloadSchema)

export default registerEventsTargetAndPayloadSchema
