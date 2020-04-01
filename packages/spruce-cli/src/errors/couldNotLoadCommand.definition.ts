import { FieldType } from '@sprucelabs/schema'

import { buildErrorDefinition } from '@sprucelabs/error'

const couldNotLoadCommandDefinition = buildErrorDefinition({
	id: 'couldNotLoadCommand',
	name: 'Could not load command',
	description: 'A command failed to load, probably because of a syntax error',
	fields: {
		file: {
			type: FieldType.Text,
			label: 'Command file path',
			isRequired: true,
			hint: 'Path to the file defining the Command class'
		}
	}
})

export default couldNotLoadCommandDefinition
