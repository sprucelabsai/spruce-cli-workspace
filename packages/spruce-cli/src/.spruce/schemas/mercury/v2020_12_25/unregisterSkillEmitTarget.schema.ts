import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const unregisterSkillEmitTargetSchema: SpruceSchemas.Mercury.v2020_12_25.UnregisterSkillEmitTargetSchema  = {
	id: 'unregisterSkillEmitTarget',
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

SchemaRegistry.getInstance().trackSchema(unregisterSkillEmitTargetSchema)

export default unregisterSkillEmitTargetSchema
