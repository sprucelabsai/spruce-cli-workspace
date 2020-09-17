import { buildSchema } from '@sprucelabs/schema'
import userSchema from '#spruce/schemas/spruce/v2020_07_22/person.schema'

export default buildSchema({
	...userSchema,
	id: 'cliUserWithToken',
	description: 'A stripped down cli user with token details for login',
	fields: {
		id: userSchema.fields.id,
		casualName: userSchema.fields.casualName,
		token: { type: 'text', isRequired: true },
		isLoggedIn: {
			type: 'boolean',
			label: 'Logged in',
		},
	},
})
