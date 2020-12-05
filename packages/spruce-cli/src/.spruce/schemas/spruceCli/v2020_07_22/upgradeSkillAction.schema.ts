import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const upgradeSkillActionSchema: SpruceSchemas.SpruceCli.v2020_07_22.UpgradeSkillActionSchema  = {
	id: 'upgradeSkillAction',
	version: 'v2020_07_22',
	namespace: 'SpruceCli',
	name: 'Upgrade skill action',
	description: 'Options skill.upgrade.',
	    fields: {
	            /** Force. This will force overwrite each file */
	            'force': {
	                label: 'Force',
	                type: 'boolean',
	                hint: 'This will force overwrite each file',
	                options: undefined
	            },
	    }
	
	
}

SchemaRegistry.getInstance().trackSchema(upgradeSkillActionSchema)

export default upgradeSkillActionSchema
