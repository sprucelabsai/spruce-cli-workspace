import { buildSchemaDefinition } from '@sprucelabs/schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'

const cliUserDefinition = buildSchemaDefinition({
	...SpruceSchemas.Core.User.definition,
	id: 'cliUser',
	description: 'A stripped down user for the cli',
	fields: {
		id: SpruceSchemas.Core.User.definition.fields.id,
		casualName: SpruceSchemas.Core.User.definition.fields.casualName
	}
})

export default cliUserDefinition
