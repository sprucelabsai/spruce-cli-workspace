import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import unRegisterEventsEmitPayloadSchema from '#spruce/schemas/mercuryApi/unRegisterEventsEmitPayload.schema'

const unRegisterEventsTargetAndPayloadSchema: SpruceSchemas.MercuryApi.UnRegisterEventsTargetAndPayloadSchema  = {
	id: 'unRegisterEventsTargetAndPayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: unRegisterEventsEmitPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(unRegisterEventsTargetAndPayloadSchema)

export default unRegisterEventsTargetAndPayloadSchema
