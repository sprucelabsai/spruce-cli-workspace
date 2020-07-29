import { buildSchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import userSchema from '#spruce/schemas/spruce/v2020_07_22/person.schema'

export default buildSchema({
	...userSchema,
	id: 'cliUserWithToken',
	description: 'A stripped down cli user with token details for login',
	fields: {
		id: userSchema.fields.id,
		casualName: userSchema.fields.casualName,
		token: { type: FieldType.Text, isRequired: true },
		isLoggedIn: {
			type: FieldType.Boolean,
			label: 'Logged in',
		},
	},
})
