import * as SpruceSchema from '@sprucelabs/schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'

const skillFeaturedefinition: SpruceSchemas.Local.SkillFeature.IDefinition = {
	id: 'skillFeature',
	name: 'Skill Feature',
	description: '',

	fields: {
		/** What's the name of your skill?. */
		name: {
			label: "What's the name of your skill?",
			type: SpruceSchema.FieldType.Text,

			isRequired: true,

			options: undefined
		},
		/** How would you describe your skill?. */
		description: {
			label: 'How would you describe your skill?',
			type: SpruceSchema.FieldType.Text,

			isRequired: true,

			options: undefined
		}
	}
}

export default skillFeaturedefinition
