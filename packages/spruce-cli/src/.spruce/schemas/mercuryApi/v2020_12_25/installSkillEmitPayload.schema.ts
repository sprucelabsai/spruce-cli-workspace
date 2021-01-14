import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const installSkillEmitPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.InstallSkillEmitPayloadSchema  = {
	id: 'installSkillEmitPayload',
	version: 'v2020_12_25',
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
