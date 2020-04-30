import { buildSchemaDefinition, FieldType } from '@sprucelabs/schema'

const testFeatureDefinition = buildSchemaDefinition({
	id: 'testFeature',
	name: 'Test Feature',
	fields: {
		target: {
			type: FieldType.File,
			isRequired: true,
			label: 'What file would you like to test?'
		}
	}
})

export default testFeatureDefinition
