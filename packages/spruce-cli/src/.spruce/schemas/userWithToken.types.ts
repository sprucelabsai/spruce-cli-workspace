import Schema, {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import userWithTokenDefinition from '../../schemas/userWithToken.definition'

type UserDefinition = typeof userWithTokenDefinition
export interface IUserDefinition extends UserDefinition {}

A stripped down cli user with token details for login
export interface IUser extends SchemaDefinitionValues<IUserDefinition> {}
export interface IUserInstance extends Schema<IUserDefinition> {}
