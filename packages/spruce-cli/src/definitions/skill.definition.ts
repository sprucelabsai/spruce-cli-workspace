import Schema, {
	buildSchemaDefinition,
	SchemaDefinitionValues
} from '@sprucelabs/schema'
import { SpruceSchemas } from '../.spruce/schemas'

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

export type Skill = SchemaDefinitionValues<typeof skillDefinition>
export type SkillInstance = Schema<typeof skillDefinition>
