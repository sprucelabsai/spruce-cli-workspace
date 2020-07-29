import { SpruceSchemas } from '../../schemas.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'



const skillFeatureDefinition: SpruceSchemas.Local.SkillFeature.v2020_07_22.IDefinition  = {
	id: 'skillFeature',
	name: 'Skill Feature',
	    fields: {
	            /** What's the name of your skill?. */
	            'name': {
	                label: 'What\'s the name of your skill?',
	                type: FieldType.Text,
	                isRequired: true,
	                options: undefined
	            },
	            /** How would you describe your skill?. */
	            'description': {
	                label: 'How would you describe your skill?',
	                type: FieldType.Text,
	                isRequired: true,
	                options: undefined
	            },
	    }
}

export default skillFeatureDefinition
