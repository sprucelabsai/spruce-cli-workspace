import { buildErrorSchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

export default buildErrorSchema({
	id: 'commandAborted',
	name: 'Command aborted',
	description: '',
	fields: {
		command: {
			type: FieldType.Text,
			label: 'Command',
			isRequired: true,
		},
	},
})
