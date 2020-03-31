import Schema, {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import groupDefinition from '../../temporary/schemas/group.definition'

export interface IGroup extends SchemaDefinitionValues<typeof groupDefinition> {}
export interface IGroupInstance extends Schema<typeof groupDefinition> {}
