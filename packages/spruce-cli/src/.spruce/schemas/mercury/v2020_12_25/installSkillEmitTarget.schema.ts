import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const installSkillEmitTargetSchema: SpruceSchemas.Mercury.v2020_12_25.InstallSkillEmitTargetSchema  = {
	id: 'installSkillEmitTarget',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'organizationId': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(installSkillEmitTargetSchema)

export default installSkillEmitTargetSchema
