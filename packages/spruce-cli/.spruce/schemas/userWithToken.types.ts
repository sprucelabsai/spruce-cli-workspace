import Schema, {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import userWithTokenDefinition from '../../src/schemas/userWithToken.definition'

type UserWithTokenDefinition = typeof userWithTokenDefinition
export interface IUserWithTokenDefinition extends UserWithTokenDefinition {}

// A stripped down cli user with token details for login
export interface IUserWithToken extends SchemaDefinitionValues<IUserWithTokenDefinition> {}
export interface IUserWithTokenInstance extends Schema<IUserWithTokenDefinition> {}
