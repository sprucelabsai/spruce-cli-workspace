import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const authenticateEmitPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.AuthenticateEmitPayloadSchema  = {
	id: 'authenticateEmitPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'token': {
	                type: 'text',
	                options: undefined
	            },
	            /** . */
	            'skillId': {
	                type: 'text',
	                options: undefined
	            },
	            /** . */
	            'apiKey': {
	                type: 'text',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(authenticateEmitPayloadSchema)

export default authenticateEmitPayloadSchema
