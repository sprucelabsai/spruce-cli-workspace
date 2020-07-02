import { buildSchemaDefinition } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

export default buildSchemaDefinition({
	id: 'skillFeature',
	name: 'Skill Feature',
	fields: {
		name: {
			type: FieldType.Text,
			isRequired: true,
			label: "What's the name of your skill?"
		},
		description: {
			type: FieldType.Text,
			isRequired: true,
			label: 'How would you describe your skill?'
		}
	}
})
