import { SpruceSchemas } from '../../schemas.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'



const upgradeSkillActionSchema: SpruceSchemas.Local.v2020_07_22.IUpgradeSkillActionSchema  = {
	id: 'upgradeSkillAction',
	name: 'Upgrade skill action',
	description: 'Options skill.upgrade.',
	    fields: {
	            /** Force. This will force overwrite each file */
	            'force': {
	                label: 'Force',
	                type: FieldType.Boolean,
	                hint: 'This will force overwrite each file',
	                options: undefined
	            },
	    }
}

export default upgradeSkillActionSchema
