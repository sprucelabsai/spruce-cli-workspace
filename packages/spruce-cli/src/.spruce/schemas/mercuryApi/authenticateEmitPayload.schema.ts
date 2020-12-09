import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'



const authenticateEmitPayloadSchema: SpruceSchemas.MercuryApi.AuthenticateEmitPayloadSchema  = {
	id: 'authenticateEmitPayload',
	namespace: 'MercuryApi',
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
