import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'



const installSkillEmitPayloadSchema: SpruceSchemas.MercuryApi.InstallSkillEmitPayloadSchema  = {
	id: 'installSkillEmitPayload',
	namespace: 'MercuryApi',
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
