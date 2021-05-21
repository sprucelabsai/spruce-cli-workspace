import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const unInstallSkillEmitTargetSchema: SpruceSchemas.Mercury.v2020_12_25.UnInstallSkillEmitTargetSchema  = {
	id: 'unInstallSkillEmitTarget',
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
	            /** . */
	            'organizationId': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(unInstallSkillEmitTargetSchema)

export default unInstallSkillEmitTargetSchema
