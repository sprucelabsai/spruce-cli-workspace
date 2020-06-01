import { FieldType } from '#spruce/schemas/fields/fieldType'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'

const testFeatureDefinition: SpruceSchemas.Local.TestFeature.IDefinition = {
	id: 'testFeature',
	name: 'Test Feature',
	fields: {
		/** What file would you like to test?. */
		target: {
			label: 'What file would you like to test?',
			type: FieldType.File,
			isRequired: true,
			defaultValue: { path: '' },
			options: undefined
		}
	}
}

export default testFeatureDefinition
