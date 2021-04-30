import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const unInstallSkillResponsePayloadSchema: SpruceSchemas.Mercury.v2020_12_25.UnInstallSkillResponsePayloadSchema  = {
	id: 'unInstallSkillResponsePayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	    }
}

SchemaRegistry.getInstance().trackSchema(unInstallSkillResponsePayloadSchema)

export default unInstallSkillResponsePayloadSchema
