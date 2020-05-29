import * as SpruceSchema from '@sprucelabs/schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'

const testFeatureDefinition: SpruceSchemas.Local.TestFeature.IDefinition = {
	id: 'testFeature',
	name: 'Test Feature',
	fields: {
		/** What file would you like to test?. */
		target: {
			label: 'What file would you like to test?',
			type: SpruceSchema.FieldType.File,
			isRequired: true,
			defaultValue: { path: '' },
			options: undefined
		}
	}
}

export default testFeatureDefinition
