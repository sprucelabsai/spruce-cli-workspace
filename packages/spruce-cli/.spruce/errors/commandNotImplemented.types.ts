// the options for the CommandNotImplemented error

import { ISpruceErrorOptions } from '@sprucelabs/error'
import { SchemaDefinitionValues } from '@sprucelabs/schema'
import commandNotImplementedDefinition from '../../src/errors/commandNotImplemented.definition'
import { ErrorCode } from './codes.types'

type CommandNotImplementedDefinition = typeof commandNotImplementedDefinition
export interface ICommandNotImplementedDefinition
	extends CommandNotImplementedDefinition {}

export interface ICommandNotImplementedErrorOptions
	extends SchemaDefinitionValues<ICommandNotImplementedDefinition>,
		ISpruceErrorOptions<ErrorCode> {
	/** * .CommandNotImplemented - This command has not yet been implemented  */
	code: ErrorCode.CommandNotImplemented
}
