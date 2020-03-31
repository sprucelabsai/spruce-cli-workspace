import Schema, {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import aclDefinition from '../../temporary/schemas/acl.definition'

export interface IAcl extends SchemaDefinitionValues<typeof aclDefinition> {}
export interface IAclInstance extends Schema<typeof aclDefinition> {}
