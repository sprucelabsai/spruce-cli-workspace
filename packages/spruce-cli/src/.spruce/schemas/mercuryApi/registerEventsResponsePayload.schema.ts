import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'



const registerEventsResponsePayloadSchema: SpruceSchemas.MercuryApi.RegisterEventsResponsePayloadSchema  = {
	id: 'registerEventsResponsePayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	    }
}

SchemaRegistry.getInstance().trackSchema(registerEventsResponsePayloadSchema)

export default registerEventsResponsePayloadSchema
