import Schema, {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import tacoBravoDefinition from '../../schemas/tacoBravo.definition'

export type TacoBravoDefinition = typeof tacoBravoDefinition
export interface ITacoBravo extends SchemaDefinitionValues<TacoBravoDefinition> {}
export interface ITacoBravoInstance extends Schema<TacoBravoDefinition> {}
