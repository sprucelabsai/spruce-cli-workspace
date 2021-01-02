import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import registerEventsEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/registerEventsEmitPayload.schema'

const registerEventsTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.RegisterEventsTargetAndPayloadSchema  = {
	id: 'registerEventsTargetAndPayload',
	version: 'v2020_12_25',
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
