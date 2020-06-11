import { buildSchemaDefinition, FieldType } from '@sprucelabs/schema'
import userDefinition from '#spruce/schemas/core/user.definition'

export default buildSchemaDefinition({
	...userDefinition,
	id: 'cliUserWithToken',
	description: 'A stripped down cli user with token details for login',
	fields: {
		id: userDefinition.fields.id,
		casualName: userDefinition.fields.casualName,
		token: { type: FieldType.Text, isRequired: true },
		isLoggedIn: {
			type: FieldType.Boolean,
			label: 'Logged in'
		}
	}
})
