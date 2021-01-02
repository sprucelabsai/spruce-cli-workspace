import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import requestPinEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/requestPinEmitPayload.schema'

const requestPinTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.RequestPinTargetAndPayloadSchema  = {
	id: 'requestPinTargetAndPayload',
	version: 'v2020_12_25',
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
