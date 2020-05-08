import { buildSchemaDefinition } from '@sprucelabs/schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
const cliSkillDefinition = buildSchemaDefinition({
	...SpruceSchemas.Core.Skill.definition,
	id: 'cliSkill',
	description: 'A stripped down skill for the cli',
	fields: {
		id: SpruceSchemas.Core.Skill.definition.fields.id,
		apiKey: SpruceSchemas.Core.Skill.definition.fields.apiKey,
		name: SpruceSchemas.Core.Skill.definition.fields.name,
		slug: SpruceSchemas.Core.Skill.definition.fields.slug
	}
})

export default cliSkillDefinition
