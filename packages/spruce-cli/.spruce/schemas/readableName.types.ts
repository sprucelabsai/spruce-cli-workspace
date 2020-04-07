import Schema, {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import readableNameDefinition from '../../src/schemas/readableName.definition'

type ReadableNameDefinition = typeof readableNameDefinition
export interface IReadableNameDefinition extends ReadableNameDefinition {}

// aoeuaoeuaoeu ao uaou
export interface IReadableName extends SchemaDefinitionValues<IReadableNameDefinition> {}
export interface IReadableNameInstance extends Schema<IReadableNameDefinition> {}
