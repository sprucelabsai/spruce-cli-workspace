import { SpruceSchemas } from '../../schemas.types'




const upgradeSkillActionSchema: SpruceSchemas.SpruceCli.v2020_07_22.IUpgradeSkillActionSchema  = {
	id: 'upgradeSkillAction',
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

export default upgradeSkillActionSchema
