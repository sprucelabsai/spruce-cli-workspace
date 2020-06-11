import { FieldType, buildErrorDefinition } from '@sprucelabs/schema'

const genericDefinition = buildErrorDefinition({
	id: 'generic',
	name: 'generic',
	description: "When you're too lazy to make a new error",
	fields: {
		friendlyMessageSet: {
			type: FieldType.Text,
			label: 'Friendly message'
		}
	}
})

export default genericDefinition
