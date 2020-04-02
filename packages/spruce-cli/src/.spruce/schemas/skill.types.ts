import Schema, {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import skillDefinition from '../../schemas/skill.definition'

type SkillDefinition = typeof skillDefinition
export interface ISkillDefinition extends SkillDefinition {}

A stripped down skill for the cli
export interface ISkill extends SchemaDefinitionValues<ISkillDefinition> {}
export interface ISkillInstance extends Schema<ISkillDefinition> {}
