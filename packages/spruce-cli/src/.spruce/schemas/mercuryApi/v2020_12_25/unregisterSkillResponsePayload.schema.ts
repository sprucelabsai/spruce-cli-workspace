import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const unregisterSkillResponsePayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.UnregisterSkillResponsePayloadSchema  = {
	id: 'unregisterSkillResponsePayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	    }
}

SchemaRegistry.getInstance().trackSchema(unregisterSkillResponsePayloadSchema)

export default unregisterSkillResponsePayloadSchema
