import { buildSchemaDefinition, FieldType } from '@sprucelabs/schema'

const skillFeatureDefinition = buildSchemaDefinition({
	id: 'skillFeature',
	name: 'Skill Feature',
	fields: {
		skillName: {
			type: FieldType.Text,
			label: 'Name',
			isRequired: true,
			hint: "What's the name of your skill?"
		},
		description: {
			type: FieldType.Text,
			label: 'Description',
			isRequired: true,
			hint: 'How would you describe your skill?'
		}
	}
})

export default skillFeatureDefinition
