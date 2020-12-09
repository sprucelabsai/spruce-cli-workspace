import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import confirmPinEmitPayloadSchema from '#spruce/schemas/mercuryApi/confirmPinEmitPayload.schema'

const confirmPinTargetAndPayloadSchema: SpruceSchemas.MercuryApi.ConfirmPinTargetAndPayloadSchema  = {
	id: 'confirmPinTargetAndPayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: confirmPinEmitPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(confirmPinTargetAndPayloadSchema)

export default confirmPinTargetAndPayloadSchema
