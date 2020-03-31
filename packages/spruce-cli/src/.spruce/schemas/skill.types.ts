import Schema, {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import skillDefinition from ''

export type SkillDefinition = typeof skillDefinition
export interface ISkill extends SchemaDefinitionValues<SkillDefinition> {}
export interface ISkillInstance extends Schema<SkillDefinition> {}
