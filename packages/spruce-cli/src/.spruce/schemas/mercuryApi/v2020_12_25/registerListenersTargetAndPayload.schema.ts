import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import registerListenersEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/registerListenersEmitPayload.schema'

const registerListenersTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.RegisterListenersTargetAndPayloadSchema  = {
	id: 'registerListenersTargetAndPayload',
	version: 'v2020_12_25',
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
