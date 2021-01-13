import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

const scrambleAccountResponsePayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.ScrambleAccountResponsePayloadSchema = {
	id: 'scrambleAccountResponsePayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	fields: {},
}

SchemaRegistry.getInstance().trackSchema(scrambleAccountResponsePayloadSchema)

export default scrambleAccountResponsePayloadSchema
