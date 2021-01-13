import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

const unregisterListenersResponsePayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.UnregisterListenersResponsePayloadSchema = {
	id: 'unregisterListenersResponsePayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	fields: {
		/** . */
		unregisterCount: {
			type: 'number',
			isRequired: true,
			options: undefined,
		},
	},
}

SchemaRegistry.getInstance().trackSchema(
	unregisterListenersResponsePayloadSchema
)

export default unregisterListenersResponsePayloadSchema
