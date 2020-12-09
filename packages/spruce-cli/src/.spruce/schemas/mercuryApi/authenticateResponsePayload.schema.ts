import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'

import authSchemaSchema from '#spruce/schemas/mercuryApi/authSchema.schema'

const authenticateResponsePayloadSchema: SpruceSchemas.MercuryApi.AuthenticateResponsePayloadSchema  = {
	id: 'authenticateResponsePayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'type': {
	                type: 'select',
	                isRequired: true,
	                options: {choices: [{"value":"authenticated","label":"Authenticated"},{"value":"anonymous","label":"Anonymous"}],}
	            },
	            /** . */
	            'auth': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: authSchemaSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(authenticateResponsePayloadSchema)

export default authenticateResponsePayloadSchema
