import { buildErrorSchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

export default buildErrorSchema({
	id: 'directoryEmpty',
	name: 'directory empty',
	description: '',
	fields: {
		directory: {
			type: FieldType.Text,
			isRequired: true,
		},
	},
})
