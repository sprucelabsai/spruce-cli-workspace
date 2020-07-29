import { buildErrorSchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

const directoryEmptyDefinition = buildErrorSchema({
	id: 'directoryEmpty',
	name: 'directoryEmpty',
	description: 'The directory is empty',
	fields: {
		directory: {
			type: FieldType.Text,
			label: 'Directory',
			isRequired: true,
			hint: 'The directory',
		},
	},
})

export default directoryEmptyDefinition
