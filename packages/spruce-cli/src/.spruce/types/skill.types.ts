import Schema, {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import skillDefinition from '../../schemas/skill.definition'

export interface ISkill extends SchemaDefinitionValues<typeof skillDefinition> {}
export interface ISkillInstance extends Schema<typeof skillDefinition> {}
