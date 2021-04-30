import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const installSkillResponsePayloadSchema: SpruceSchemas.Mercury.v2020_12_25.InstallSkillResponsePayloadSchema  = {
	id: 'installSkillResponsePayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	    }
}

SchemaRegistry.getInstance().trackSchema(installSkillResponsePayloadSchema)

export default installSkillResponsePayloadSchema
