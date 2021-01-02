import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import unRegisterListenersEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/unRegisterListenersEmitPayload.schema'

const unRegisterListenersTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.UnRegisterListenersTargetAndPayloadSchema  = {
	id: 'unRegisterListenersTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: unRegisterListenersEmitPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(unRegisterListenersTargetAndPayloadSchema)

export default unRegisterListenersTargetAndPayloadSchema
