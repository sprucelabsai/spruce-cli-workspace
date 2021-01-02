import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const unInstallSkillEmitPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.UnInstallSkillEmitPayloadSchema  = {
	id: 'unInstallSkillEmitPayload',
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

SchemaRegistry.getInstance().trackSchema(unInstallSkillEmitPayloadSchema)

export default unInstallSkillEmitPayloadSchema
