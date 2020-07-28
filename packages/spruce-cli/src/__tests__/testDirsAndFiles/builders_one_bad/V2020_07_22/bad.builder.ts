import { buildErrorDefinition } from '__tests__/testDirsAndFiles/builders_one_bad/v2020_07_22/node_modules/@sprucelabs/schema'

export default buildErrorDefinition({
	id: 'good',
	name: 'Good one',
	description: 'Another for testing',
	fields: {
		textField: {
			//@ts-ignore
			// eslint-disable-next-line no-undef
			type: FieldType.Text,
			label: 'Example',
		},
	},
})
