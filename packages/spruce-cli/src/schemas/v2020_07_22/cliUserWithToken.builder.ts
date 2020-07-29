import { buildSchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import UserSchema from '#spruce/schemas/spruce/v2020_07_22/person.builder'

export default buildSchema({
	...UserSchema,
	id: 'cliUserWithToken',
	description: 'A stripped down cli user with token details for login',
	fields: {
		id: UserSchema.fields.id,
		casualName: UserSchema.fields.casualName,
		token: { type: FieldType.Text, isRequired: true },
		isLoggedIn: {
			type: FieldType.Boolean,
			label: 'Logged in',
		},
	},
})
