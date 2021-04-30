import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const unregisterSkillResponsePayloadSchema: SpruceSchemas.Mercury.v2020_12_25.UnregisterSkillResponsePayloadSchema  = {
	id: 'unregisterSkillResponsePayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	    }
}

SchemaRegistry.getInstance().trackSchema(unregisterSkillResponsePayloadSchema)

export default unregisterSkillResponsePayloadSchema
