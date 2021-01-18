import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const unregisterEventsResponsePayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.UnregisterEventsResponsePayloadSchema  = {
	id: 'unregisterEventsResponsePayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	    }
}

SchemaRegistry.getInstance().trackSchema(unregisterEventsResponsePayloadSchema)

export default unregisterEventsResponsePayloadSchema
