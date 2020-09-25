import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
	id: 'generatedFile',
	name: 'Generated File',
	description: '',
	fields: {
		name: {
			type: 'text',
			isRequired: true,
		},
		path: {
			type: 'text',
			isRequired: true,
		},
		fieldName2: {
			type: 'number',
			label: 'Second Field',
			isRequired: true,
			hint: 'A hint',
		},
	},
})
