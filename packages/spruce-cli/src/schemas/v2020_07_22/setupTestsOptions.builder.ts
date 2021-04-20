import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
	id: 'setupTestsOptions',
	name: 'Setup tests options',
	description: '',
	fields: {
		demoNumber: {
			type: 'phone',
			label: 'Demo phone number',
			isRequired: true,
		},
		skillSlug: {
			type: 'text',
			label: 'Skill slug',
			isRequired: true,
		},
	},
})
