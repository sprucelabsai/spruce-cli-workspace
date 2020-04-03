import { FieldType } from '@sprucelabs/schema'

import { buildErrorDefinition } from '@sprucelabs/error'

const transpileFailedDefinition = buildErrorDefinition({
	id: 'transpileFailed',
	name: 'Transpile failed',
	description: 'Could not transpile (ts -> js) a script',
	fields: {
		source: {
			type: FieldType.Text,
			label: 'Source',
			isRequired: true,
			hint: 'Source contents, should be typescript format'
		}
	}
})

export default transpileFailedDefinition
