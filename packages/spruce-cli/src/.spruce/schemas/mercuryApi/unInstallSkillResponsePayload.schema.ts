import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'



const unInstallSkillResponsePayloadSchema: SpruceSchemas.MercuryApi.UnInstallSkillResponsePayloadSchema  = {
	id: 'unInstallSkillResponsePayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	    }
}

SchemaRegistry.getInstance().trackSchema(unInstallSkillResponsePayloadSchema)

export default unInstallSkillResponsePayloadSchema
