import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

const listOrgsEmitPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.ListOrgsEmitPayloadSchema = {
	id: 'listOrgsEmitPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	fields: {
		/** . */
		showMineOnly: {
			type: 'boolean',
			options: undefined,
		},
	},
}

SchemaRegistry.getInstance().trackSchema(listOrgsEmitPayloadSchema)

export default listOrgsEmitPayloadSchema
