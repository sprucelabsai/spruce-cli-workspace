import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import authSchemaSchema from '#spruce/schemas/mercuryApi/v2020_12_25/authSchema.schema'

const authenticateResponsePayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.AuthenticateResponsePayloadSchema  = {
	id: 'authenticateResponsePayload',
	version: 'v2020_12_25',
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
