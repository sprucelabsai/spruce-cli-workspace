import { buildErrorSchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

export default buildErrorSchema({
	id: 'couldNotLoadCommand',
	name: 'Could not load command',
	description: 'A command failed to load, probably because of a syntax error',
	fields: {
		file: {
			type: FieldType.Text,
			label: 'Command file path',
			isRequired: true,
			hint: 'Path to the file defining the Command class',
		},
	},
})
