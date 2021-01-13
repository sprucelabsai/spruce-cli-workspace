import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

const registerEventsResponsePayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.RegisterEventsResponsePayloadSchema = {
	id: 'registerEventsResponsePayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	fields: {},
}

SchemaRegistry.getInstance().trackSchema(registerEventsResponsePayloadSchema)

export default registerEventsResponsePayloadSchema
