import Schema, {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import personDefinition from '../../schemas/person.definition'

type PersonDefinition = typeof personDefinition
export interface IPersonDefinition extends PersonDefinition {}

// A human person
export interface IPerson extends SchemaDefinitionValues<IPersonDefinition> {}
export interface IPersonInstance extends Schema<IPersonDefinition> {}
