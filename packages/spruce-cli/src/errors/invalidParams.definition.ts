import { FieldType } from '@sprucelabs/schema'

import { buildErrorDefinition } from '@sprucelabs/error'

const invalidParamsDefinition = buildErrorDefinition({
	id: 'invalidParams',
	name: 'Invalid params',
	description: 'taoehustnaoeh usntaoh eu',
	fields: {
		fieldName1: {
			type: FieldType.Boolean,
			label: 'First Field',
			isRequired: true
		},
		fieldName2: {
			type: FieldType.Number,
			label: 'Second Field',
			isRequired: true,
			hint: 'A hint'
		}
	}
})

export default invalidParamsDefinition
