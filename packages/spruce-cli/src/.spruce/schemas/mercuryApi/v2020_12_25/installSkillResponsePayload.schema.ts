import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const installSkillResponsePayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.InstallSkillResponsePayloadSchema  = {
	id: 'installSkillResponsePayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	    }
}

SchemaRegistry.getInstance().trackSchema(installSkillResponsePayloadSchema)

export default installSkillResponsePayloadSchema
