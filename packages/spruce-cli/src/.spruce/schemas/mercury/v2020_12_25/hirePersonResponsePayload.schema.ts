import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const hirePersonResponsePayloadSchema: SpruceSchemas.Mercury.v2020_12_25.HirePersonResponsePayloadSchema  = {
	id: 'hirePersonResponsePayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	    }
}

SchemaRegistry.getInstance().trackSchema(hirePersonResponsePayloadSchema)

export default hirePersonResponsePayloadSchema
