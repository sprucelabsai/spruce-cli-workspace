import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'



const scrambleAccountResponsePayloadSchema: SpruceSchemas.MercuryApi.ScrambleAccountResponsePayloadSchema  = {
	id: 'scrambleAccountResponsePayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	    }
}

SchemaRegistry.getInstance().trackSchema(scrambleAccountResponsePayloadSchema)

export default scrambleAccountResponsePayloadSchema
