import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import unRegisterEventsEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/unRegisterEventsEmitPayload.schema'

const unRegisterEventsTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.UnRegisterEventsTargetAndPayloadSchema  = {
	id: 'unRegisterEventsTargetAndPayload',
	version: 'v2020_12_25',
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
