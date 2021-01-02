import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const unRegisterEventsResponsePayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.UnRegisterEventsResponsePayloadSchema  = {
	id: 'unRegisterEventsResponsePayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	    }
}

SchemaRegistry.getInstance().trackSchema(unRegisterEventsResponsePayloadSchema)

export default unRegisterEventsResponsePayloadSchema
