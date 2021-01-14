import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const upgradeSkillActionSchema: SpruceSchemas.SpruceCli.v2020_07_22.UpgradeSkillActionSchema  = {
	id: 'upgradeSkillAction',
	version: 'v2020_07_22',
	namespace: 'SpruceCli',
	name: 'Upgrade skill action',
	description: 'Options skill.upgrade.',
	    fields: {
	            /** Upgrade mode. */
	            'upgradeMode': {
	                label: 'Upgrade mode',
	                type: 'select',
	                defaultValue: "forceRequiredSkipRest",
	                options: {choices: [{"value":"askEverything","label":"Ask for everything"},{"value":"forceEverything","label":"Force everything"},{"value":"forceRequiredSkipRest","label":"Force required (skipping all non-essential)"}],}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(upgradeSkillActionSchema)

export default upgradeSkillActionSchema
