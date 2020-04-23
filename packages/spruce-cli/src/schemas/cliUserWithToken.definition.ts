import { buildSchemaDefinition, FieldType } from '@sprucelabs/schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'

const cliUserWithTokenDefinition = buildSchemaDefinition({
	...SpruceSchemas.core.User.definition,
	id: 'cliUserWithToken',
	description: 'A stripped down cli user with token details for login',
	fields: {
		id: SpruceSchemas.core.User.definition.fields.id,
		casualName: SpruceSchemas.core.User.definition.fields.casualName,
		token: { type: FieldType.Text, isRequired: true },
		isLoggedIn: {
			type: FieldType.Boolean,
			label: 'Logged in'
		}
	}
})

export default cliUserWithTokenDefinition
