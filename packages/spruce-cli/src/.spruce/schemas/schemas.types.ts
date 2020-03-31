import Schema, {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import schemasDefinition from ''

export interface Ischemas extends SchemaDefinitionValues<typeof schemasDefinition> {}
export interface IschemasInstance extends Schema<typeof schemasDefinition> {}
