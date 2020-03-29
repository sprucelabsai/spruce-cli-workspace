import {
	buildSchemaDefinition,
	buildFieldDefinition,
	FieldType,
	SchemaDefinitionValues
} from '@sprucelabs/schema'
import { SpruceSchemas } from '../.spruce/schemas'

const userWithTokenDefinition = buildSchemaDefinition({
	...SpruceSchemas.core.User.definition,
	id: 'userWithToken',
	description: 'A stripped down cli user with token details for login',
	fields: {
		id: SpruceSchemas.core.User.definition.fields.id,
		casualName: SpruceSchemas.core.User.definition.fields.casualName,
		token: buildFieldDefinition({ type: FieldType.Text, isRequired: true }),
		isLoggedIn: buildFieldDefinition({
			type: FieldType.Boolean,
			label: 'Is logged in'
		})
	}
})

export default userWithTokenDefinition

export type UserWithToken = SchemaDefinitionValues<
	typeof userWithTokenDefinition
>
