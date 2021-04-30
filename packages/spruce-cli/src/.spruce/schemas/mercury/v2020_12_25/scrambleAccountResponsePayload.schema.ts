import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const scrambleAccountResponsePayloadSchema: SpruceSchemas.Mercury.v2020_12_25.ScrambleAccountResponsePayloadSchema  = {
	id: 'scrambleAccountResponsePayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	    }
}

SchemaRegistry.getInstance().trackSchema(scrambleAccountResponsePayloadSchema)

export default scrambleAccountResponsePayloadSchema
