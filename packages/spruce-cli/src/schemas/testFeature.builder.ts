import { buildSchemaDefinition, FieldType } from '@sprucelabs/schema'

export default buildSchemaDefinition({
	id: 'testFeature',
	name: 'Test Feature',
	fields: {
		target: {
			type: FieldType.File,
			isRequired: true,
			label: 'What file would you like to test?',
			defaultValue: {
				path: ''
			}
		}
	}
})
