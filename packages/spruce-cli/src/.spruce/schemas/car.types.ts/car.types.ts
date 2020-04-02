import Schema, {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import carDefinition from '../../../schemas/car.definition'

type CarDefinition = typeof carDefinition
export interface ICarDefinition extends CarDefinition {}

Test drive
export interface ICar extends SchemaDefinitionValues<ICarDefinition> {}
export interface ICarInstance extends Schema<ICarDefinition> {}
