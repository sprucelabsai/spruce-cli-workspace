import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'



const unInstallSkillEmitPayloadSchema: SpruceSchemas.MercuryApi.UnInstallSkillEmitPayloadSchema  = {
	id: 'unInstallSkillEmitPayload',
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

SchemaRegistry.getInstance().trackSchema(unInstallSkillEmitPayloadSchema)

export default unInstallSkillEmitPayloadSchema
