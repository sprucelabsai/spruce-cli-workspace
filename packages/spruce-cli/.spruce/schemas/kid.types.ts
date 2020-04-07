import Schema, {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import kidDefinition from '../../src/schemas/kid.definition'

type KidDefinition = typeof kidDefinition
export interface IKidDefinition extends KidDefinition {}

aoeu
export interface IKid extends SchemaDefinitionValues<IKidDefinition> {}
export interface IKidInstance extends Schema<IKidDefinition> {}
