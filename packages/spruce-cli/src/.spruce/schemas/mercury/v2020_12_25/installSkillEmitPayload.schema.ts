import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const installSkillEmitPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.InstallSkillEmitPayloadSchema  = {
	id: 'installSkillEmitPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'skillId': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(installSkillEmitPayloadSchema)

export default installSkillEmitPayloadSchema
