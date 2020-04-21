import { buildSchemaDefinition } from '@sprucelabs/schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'

const userDefinition = buildSchemaDefinition({
	...SpruceSchemas.core.User.definition,
	id: 'user',
	description: 'A stripped down user for the cli',
	fields: {
		id: SpruceSchemas.core.User.definition.fields.id,
		casualName: SpruceSchemas.core.User.definition.fields.casualName
	}
})

export default userDefinition
