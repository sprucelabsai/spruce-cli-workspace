import Schema, {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import userDefinition from '../../temporary/schemas/user.definition'

export interface IUser extends SchemaDefinitionValues<typeof userDefinition> {}
export interface IUserInstance extends Schema<typeof userDefinition> {}
