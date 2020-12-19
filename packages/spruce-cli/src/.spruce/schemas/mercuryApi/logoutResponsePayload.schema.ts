import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'



const logoutResponsePayloadSchema: SpruceSchemas.MercuryApi.LogoutResponsePayloadSchema  = {
	id: 'logoutResponsePayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	    }
}

SchemaRegistry.getInstance().trackSchema(logoutResponsePayloadSchema)

export default logoutResponsePayloadSchema
