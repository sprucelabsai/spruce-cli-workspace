import { buildErrorSchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

export default buildErrorSchema({
	id: 'invalidFeatureCode',
	name: 'Invalid feature code',
	description: '',
	fields: {
		featureCode: {
			type: FieldType.Text,
			isRequired: true,
		},
	},
})
