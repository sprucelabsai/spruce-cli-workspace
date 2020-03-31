import Schema, {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import userWithTokenDefinition from '../../schemas/userWithToken.definition'

export interface IUserWithToken extends SchemaDefinitionValues<typeof userWithTokenDefinition> {}
export interface IUserWithTokenInstance extends Schema<typeof userWithTokenDefinition> {}
