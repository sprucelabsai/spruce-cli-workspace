import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import authenticateEmitPayloadSchema from '#spruce/schemas/mercuryApi/authenticateEmitPayload.schema'

const authenticateTargetAndPayloadSchema: SpruceSchemas.MercuryApi.AuthenticateTargetAndPayloadSchema  = {
	id: 'authenticateTargetAndPayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: authenticateEmitPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(authenticateTargetAndPayloadSchema)

export default authenticateTargetAndPayloadSchema
