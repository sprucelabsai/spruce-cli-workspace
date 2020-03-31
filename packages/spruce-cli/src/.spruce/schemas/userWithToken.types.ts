import Schema, {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import userWithTokenDefinition from '../../schemas/userWithToken.definition'

type UserWithTokenDefinition = typeof userWithTokenDefinition

export interface IUserWithTokenDefinition extends UserWithTokenDefinition {}
export interface IUserWithToken extends SchemaDefinitionValues<IUserWithTokenDefinition> {}
export interface IUserWithTokenInstance extends Schema<IUserWithTokenDefinition> {}
