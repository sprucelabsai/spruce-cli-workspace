import { SpruceSchemas } from '../../schemas.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'



const cliSkillSchema: SpruceSchemas.SpruceCli.v2020_07_22.ICliSkillSchema  = {
	id: 'cliSkill',
	name: 'Skill',
	description: 'A stripped down skill for the cli',
	    fields: {
	            /** Id. */
	            'id': {
	                label: 'Id',
	                type: FieldType.Id,
	                isRequired: true,
	                options: undefined
	            },
	            /** Id. */
	            'apiKey': {
	                label: 'Id',
	                type: FieldType.Id,
	                isPrivate: true,
	                isRequired: true,
	                options: undefined
	            },
	            /** Name. */
	            'name': {
	                label: 'Name',
	                type: FieldType.Text,
	                isRequired: true,
	                options: undefined
	            },
	            /** Slug. */
	            'slug': {
	                label: 'Slug',
	                type: FieldType.Text,
	                options: undefined
	            },
	    }
}

export default cliSkillSchema
