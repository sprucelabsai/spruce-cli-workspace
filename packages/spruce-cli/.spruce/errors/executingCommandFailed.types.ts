// the options for the ExecutingCommandFailed error

import {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import executingCommandFailedDefinition from '../../src/errors/executingCommandFailed.builder'
import { ISpruceErrorOptions } from '@sprucelabs/error'
import ErrorCode from './codes.types'

type ExecutingCommandFailedDefinition = typeof executingCommandFailedDefinition
export interface IExecutingCommandFailedDefinition extends ExecutingCommandFailedDefinition {}

export interface IExecutingCommandFailedErrorOptions extends SchemaDefinitionValues<IExecutingCommandFailedDefinition>, ISpruceErrorOptions<ErrorCode> {
	/** * .ExecutingCommandFailed - The command that was being executed failed */
	code: ErrorCode.ExecutingCommandFailed
} 

