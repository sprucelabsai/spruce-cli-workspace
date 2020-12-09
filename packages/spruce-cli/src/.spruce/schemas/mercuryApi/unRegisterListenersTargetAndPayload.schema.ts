import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import unRegisterListenersEmitPayloadSchema from '#spruce/schemas/mercuryApi/unRegisterListenersEmitPayload.schema'

const unRegisterListenersTargetAndPayloadSchema: SpruceSchemas.MercuryApi.UnRegisterListenersTargetAndPayloadSchema  = {
	id: 'unRegisterListenersTargetAndPayload',
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
