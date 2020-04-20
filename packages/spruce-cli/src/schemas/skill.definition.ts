import { buildSchemaDefinition } from '@sprucelabs/schema'
import { SpruceSchemas } from '#spruce/schemas/core.types'
debugger
const skillDefinition = buildSchemaDefinition({
	...SpruceSchemas.core.Skill.definition,
	id: 'skill',
	description: 'A stripped down skill for the cli',
	fields: {
		id: SpruceSchemas.core.Skill.definition.fields.id,
		apiKey: SpruceSchemas.core.Skill.definition.fields.apiKey,
		name: SpruceSchemas.core.Skill.definition.fields.name,
		slug: SpruceSchemas.core.Skill.definition.fields.slug
	}
})

export default skillDefinition
