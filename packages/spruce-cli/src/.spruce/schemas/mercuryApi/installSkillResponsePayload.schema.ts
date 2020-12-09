import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'



const installSkillResponsePayloadSchema: SpruceSchemas.MercuryApi.InstallSkillResponsePayloadSchema  = {
	id: 'installSkillResponsePayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	    }
}

SchemaRegistry.getInstance().trackSchema(installSkillResponsePayloadSchema)

export default installSkillResponsePayloadSchema
