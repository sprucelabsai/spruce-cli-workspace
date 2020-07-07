import { buildErrorDefinition } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

const directoryEmptyDefinition = buildErrorDefinition({
	id: 'directoryEmpty',
	name: 'directoryEmpty',
	description: 'The directory is empty',
	fields: {
		directory: {
			type: FieldType.Text,
			label: 'Directory',
			isRequired: true,
			hint: 'The directory'
		}
	}
})

export default directoryEmptyDefinition
