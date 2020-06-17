// the options for the LintFailed error

import { ISpruceErrorOptions } from '@sprucelabs/error'
import { SchemaDefinitionValues } from '@sprucelabs/schema'
import lintFailedDefinition from '../../src/errors/lintFailed.builder'
import ErrorCode from './codes.types'

type LintFailedDefinition = typeof lintFailedDefinition
export interface ILintFailedDefinition extends LintFailedDefinition {}

export interface ILintFailedErrorOptions
	extends SchemaDefinitionValues<ILintFailedDefinition>,
		ISpruceErrorOptions<ErrorCode> {
	/** * .LintFailed - When linting a file fails */
	code: ErrorCode.LintFailed
}
