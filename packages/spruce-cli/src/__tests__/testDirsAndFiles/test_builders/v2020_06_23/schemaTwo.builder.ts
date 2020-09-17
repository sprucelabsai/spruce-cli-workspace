import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
	id: 'schemaTwo',
	name: 'Second schema',
	description: 'It is going to be greater, I thin!',
	fields: {
		phone: {
			type: 'phone',
			isRequired: true,
		},
	},
})
