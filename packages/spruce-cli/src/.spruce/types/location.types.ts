import Schema, {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import locationDefinition from '../../temporary/schemas/location.definition'

export interface ILocation extends SchemaDefinitionValues<typeof locationDefinition> {}
export interface ILocationInstance extends Schema<typeof locationDefinition> {}
