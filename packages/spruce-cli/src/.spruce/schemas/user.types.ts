import Schema, {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import userDefinition from ''

export type UserDefinition = typeof userDefinition
export interface IUser extends SchemaDefinitionValues<UserDefinition> {}
export interface IUserInstance extends Schema<UserDefinition> {}
