import { buildSchemaDefinition, FieldType } from '@sprucelabs/schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'

const cliUserWithTokenDefinition = buildSchemaDefinition({
	...SpruceSchemas.Core.User.definition,
	id: 'cliUserWithToken',
	description: 'A stripped down cli user with token details for login',
	fields: {
		id: SpruceSchemas.Core.User.definition.fields.id,
		casualName: SpruceSchemas.Core.User.definition.fields.casualName,
		token: { type: FieldType.Text, isRequired: true },
		isLoggedIn: {
			type: FieldType.Boolean,
			label: 'Logged in'
		}
	}
})

export default cliUserWithTokenDefinition
