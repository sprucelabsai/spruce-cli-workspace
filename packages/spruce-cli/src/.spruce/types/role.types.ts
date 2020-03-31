import Schema, {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import roleDefinition from '../../temporary/schemas/role.definition'

export interface IRole extends SchemaDefinitionValues<typeof roleDefinition> {}
export interface IRoleInstance extends Schema<typeof roleDefinition> {}
