import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import registerListenersEmitPayloadSchema from '#spruce/schemas/mercuryApi/registerListenersEmitPayload.schema'

const registerListenersTargetAndPayloadSchema: SpruceSchemas.MercuryApi.RegisterListenersTargetAndPayloadSchema  = {
	id: 'registerListenersTargetAndPayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: registerListenersEmitPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(registerListenersTargetAndPayloadSchema)

export default registerListenersTargetAndPayloadSchema
