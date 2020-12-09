import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'



const unRegisterEventsResponsePayloadSchema: SpruceSchemas.MercuryApi.UnRegisterEventsResponsePayloadSchema  = {
	id: 'unRegisterEventsResponsePayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	    }
}

SchemaRegistry.getInstance().trackSchema(unRegisterEventsResponsePayloadSchema)

export default unRegisterEventsResponsePayloadSchema
