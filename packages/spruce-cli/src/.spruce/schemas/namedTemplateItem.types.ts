import Schema, {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import namedTemplateItemDefinition from '../../schemas/namedTemplateItem.definition'

type NamedTemplateItemDefinition = typeof namedTemplateItemDefinition
export interface INamedTemplateItemDefinition extends NamedTemplateItemDefinition {}

Used to collect input on the names of a class or interface
export interface INamedTemplateItem extends SchemaDefinitionValues<INamedTemplateItemDefinition> {}
export interface INamedTemplateItemInstance extends Schema<INamedTemplateItemDefinition> {}
