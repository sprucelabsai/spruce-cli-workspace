import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const logoutResponsePayloadSchema: SpruceSchemas.Mercury.v2020_12_25.LogoutResponsePayloadSchema  = {
	id: 'logoutResponsePayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	    }
}

SchemaRegistry.getInstance().trackSchema(logoutResponsePayloadSchema)

export default logoutResponsePayloadSchema
