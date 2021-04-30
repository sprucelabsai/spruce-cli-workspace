import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const registerEventsResponsePayloadSchema: SpruceSchemas.Mercury.v2020_12_25.RegisterEventsResponsePayloadSchema  = {
	id: 'registerEventsResponsePayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	    }
}

SchemaRegistry.getInstance().trackSchema(registerEventsResponsePayloadSchema)

export default registerEventsResponsePayloadSchema
