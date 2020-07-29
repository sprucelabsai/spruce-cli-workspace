import { buildSchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

export default buildSchema({
	id: 'testFeature',
	name: 'Test Feature',
	fields: {
		target: {
			type: FieldType.File,
			isRequired: true,
			label: 'What file would you like to test?',
			defaultValue: {
				path: '',
			},
		},
	},
})
