import { buildSchema } from '@sprucelabs/schema'
import personSchema from '#spruce/schemas/spruce/v2020_07_22/person.schema'

export default buildSchema({
	id: 'personWithToken',
	description: 'A stripped down cli user with token details for login',
	fields: {
		id: personSchema.fields.id,
		casualName: personSchema.fields.casualName,
		token: { type: 'text', isRequired: true },
		isLoggedIn: {
			type: 'boolean',
			label: 'Logged in',
		},
	},
})
