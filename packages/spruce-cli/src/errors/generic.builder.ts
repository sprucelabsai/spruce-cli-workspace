import { buildErrorSchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

const genericDefinition = buildErrorSchema({
	id: 'generic',
	name: 'generic',
	description: "When you're too lazy to make a new error",
	fields: {
		friendlyMessageSet: {
			type: FieldType.Text,
			label: 'Friendly message',
		},
	},
})

export default genericDefinition
