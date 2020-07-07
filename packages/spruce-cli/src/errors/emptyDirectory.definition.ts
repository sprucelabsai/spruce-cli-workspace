import { FieldType, buildErrorDefinition } from '@sprucelabs/schema'

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
