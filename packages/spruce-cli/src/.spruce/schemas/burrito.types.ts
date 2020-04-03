import Schema, {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import burritoDefinition from '../../schemas/burrito.definition'

type BurritoDefinition = typeof burritoDefinition
export interface IBurritoDefinition extends BurritoDefinition {}

Taco
export interface IBurrito extends SchemaDefinitionValues<IBurritoDefinition> {}
export interface IBurritoInstance extends Schema<IBurritoDefinition> {}
