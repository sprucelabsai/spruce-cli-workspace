import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import registerListenersEmitPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/registerListenersEmitPayload.schema'

const registerListenersEmitTargetAndPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.RegisterListenersEmitTargetAndPayloadSchema  = {
	id: 'registerListenersEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
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

SchemaRegistry.getInstance().trackSchema(registerListenersEmitTargetAndPayloadSchema)

export default registerListenersEmitTargetAndPayloadSchema
