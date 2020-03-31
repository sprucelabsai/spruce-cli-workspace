import Schema, {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import userWithTokenDefinition from ''

export type UserWithTokenDefinition = typeof userWithTokenDefinition
export interface IUserWithToken extends SchemaDefinitionValues<UserWithTokenDefinition> {}
export interface IUserWithTokenInstance extends Schema<UserWithTokenDefinition> {}
