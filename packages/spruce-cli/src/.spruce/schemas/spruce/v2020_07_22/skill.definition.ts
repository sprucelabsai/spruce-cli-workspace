import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'



const skillDefinition: SpruceSchemas.Spruce.Skill.v2020_07_22.IDefinition  = {
	id: 'skill',
	name: 'Skill',
	description: 'An ability Sprucebot has learned.',
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
	            /** Description. */
	            'description': {
	                label: 'Description',
	                type: FieldType.Text,
	                options: undefined
	            },
	            /** Slug. */
	            'slug': {
	                label: 'Slug',
	                type: FieldType.Text,
	                options: undefined
	            },
	            /** Icon. */
	            'icon': {
	                label: 'Icon',
	                type: FieldType.Text,
	                options: undefined
	            },
	    }
}

export default skillDefinition
