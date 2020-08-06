import { SpruceSchemas } from '../../schemas.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'



const bootSkillActionSchema: SpruceSchemas.Local.v2020_07_22.IBootSkillActionSchema  = {
	id: 'bootSkillAction',
	name: 'Boot skill action',
	description: 'Boot your skill, change the world. 🌎',
	    fields: {
	            /** Run local. Will run using ts-node and typescript directly. Longer boot times */
	            'local': {
	                label: 'Run local',
	                type: FieldType.Boolean,
	                hint: 'Will run using ts-node and typescript directly. Longer boot times',
	                options: undefined
	            },
	    }
}

export default bootSkillActionSchema
