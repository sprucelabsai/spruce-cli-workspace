import { SpruceSchemas } from '../../schemas.types'




const bootSkillActionSchema: SpruceSchemas.SpruceCli.v2020_07_22.IBootSkillActionSchema  = {
	id: 'bootSkillAction',
	name: 'Boot skill action',
	description: 'The options for skill.boot.',
	    fields: {
	            /** Run local. Will run using ts-node and typescript directly. Longer boot times */
	            'local': {
	                label: 'Run local',
	                type: 'boolean',
	                hint: 'Will run using ts-node and typescript directly. Longer boot times',
	                options: undefined
	            },
	    }
}

export default bootSkillActionSchema
