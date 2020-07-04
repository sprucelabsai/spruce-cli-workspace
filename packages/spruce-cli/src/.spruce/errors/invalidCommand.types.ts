// the options for the InvalidCommand error

import { ISpruceErrorOptions } from '@sprucelabs/error'
import { SchemaDefinitionValues } from '@sprucelabs/schema'
import invalidCommandDefinition from '../../errors/invalidCommand.builder'
import ErrorCode from './errorCode'

type InvalidCommandDefinition = typeof invalidCommandDefinition
export interface IInvalidCommandDefinition extends InvalidCommandDefinition {}

export interface IInvalidCommandErrorOptions
	extends SchemaDefinitionValues<IInvalidCommandDefinition>,
		ISpruceErrorOptions<ErrorCode> {
	/** * .InvalidCommand - The command is not valid, try --help */
	code: ErrorCode.InvalidCommand
}
