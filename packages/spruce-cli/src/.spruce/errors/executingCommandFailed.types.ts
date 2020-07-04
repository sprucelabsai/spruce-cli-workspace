// the options for the ExecutingCommandFailed error

import {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import executingCommandFailedDefinition from '../../errors/executingCommandFailed.builder'
import { ISpruceErrorOptions } from '@sprucelabs/error'
import ErrorCode from './errorCode'

type ExecutingCommandFailedDefinition = typeof executingCommandFailedDefinition
export interface IExecutingCommandFailedDefinition extends ExecutingCommandFailedDefinition {}

export interface IExecutingCommandFailedErrorOptions extends SchemaDefinitionValues<IExecutingCommandFailedDefinition>, ISpruceErrorOptions<ErrorCode> {
	/** * .ExecutingCommandFailed - The command that was being executed failed */
	code: ErrorCode.ExecutingCommandFailed
} 

