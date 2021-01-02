import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import confirmPinEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/confirmPinEmitPayload.schema'

const confirmPinTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.ConfirmPinTargetAndPayloadSchema  = {
	id: 'confirmPinTargetAndPayload',
	version: 'v2020_12_25',
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
