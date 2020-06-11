// the options for the CouldNotLoadCommand error

import { ISpruceErrorOptions } from '@sprucelabs/error'
import { SchemaDefinitionValues } from '@sprucelabs/schema'
import couldNotLoadCommandDefinition from '../../src/errors/couldNotLoadCommand.builder'
import { ErrorCode } from './codes.types'

type CouldNotLoadCommandDefinition = typeof couldNotLoadCommandDefinition
export interface ICouldNotLoadCommandDefinition
	extends CouldNotLoadCommandDefinition {}

export interface ICouldNotLoadCommandErrorOptions
	extends SchemaDefinitionValues<ICouldNotLoadCommandDefinition>,
		ISpruceErrorOptions<ErrorCode> {
	/** * .CouldNotLoadCommand - A command failed to load, probably because of a syntax error */
	code: ErrorCode.CouldNotLoadCommand
}
