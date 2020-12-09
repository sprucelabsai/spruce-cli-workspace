import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import requestPinEmitPayloadSchema from '#spruce/schemas/mercuryApi/requestPinEmitPayload.schema'

const requestPinTargetAndPayloadSchema: SpruceSchemas.MercuryApi.RequestPinTargetAndPayloadSchema  = {
	id: 'requestPinTargetAndPayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: requestPinEmitPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(requestPinTargetAndPayloadSchema)

export default requestPinTargetAndPayloadSchema
