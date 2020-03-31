import Schema, {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import namedTemplateItemDefinition from '../../schemas/namedTemplateItem.definition'

export type NamedTemplateItemDefinition = typeof namedTemplateItemDefinition

export interface INamedTemplateItemDefinition extends NamedTemplateItemDefinition {}
export interface INamedTemplateItem extends SchemaDefinitionValues<INamedTemplateItemDefinition> {}
export interface INamedTemplateItemInstance extends Schema<INamedTemplateItemDefinition> {}
