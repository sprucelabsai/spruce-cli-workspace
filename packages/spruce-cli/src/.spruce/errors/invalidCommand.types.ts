// the options for the InvalidCommand error

import {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import invalidCommandDefinition from '../../errors/invalidCommand.definition'
import { ISpruceErrorOptions } from '@sprucelabs/error'
import { ErrorCode } from './codes.types'

type InvalidCommandDefinition = typeof invalidCommandDefinition
export interface IInvalidCommandDefinition extends InvalidCommandDefinition {}

export interface IInvalidCommandErrorOptions extends SchemaDefinitionValues<IInvalidCommandDefinition>, ISpruceErrorOptions<ErrorCode> {
	/** * .InvalidCommand - The command is not valid, try --help */
	code: ErrorCode.InvalidCommand
} 

