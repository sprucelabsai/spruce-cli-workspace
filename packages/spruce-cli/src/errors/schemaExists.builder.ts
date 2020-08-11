import { buildErrorSchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

export default buildErrorSchema({
	id: 'schemaExists',
	name: 'Schema exists',
	description: '',
	fields: {
		schemaId: {
			type: FieldType.Text,
			label: 'Schema id',
			isRequired: true,
		},
		destination: {
			type: FieldType.Text,
			label: 'Destination',
		},
	},
})
