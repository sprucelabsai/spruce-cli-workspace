// the options for the BuildFailed error

import { ISpruceErrorOptions } from '@sprucelabs/error'
import { SchemaDefinitionValues } from '@sprucelabs/schema'
import buildFailedDefinition from '../../errors/buildFailed.builder'
import ErrorCode from './errorCode'

type BuildFailedDefinition = typeof buildFailedDefinition
export interface IBuildFailedDefinition extends BuildFailedDefinition {}

export interface IBuildFailedErrorOptions
	extends SchemaDefinitionValues<IBuildFailedDefinition>,
		ISpruceErrorOptions<ErrorCode> {
	/** * .BuildFailed - Error thrown when building or linting failed. Happens when a yarn command fails inside the package utility. */
	code: ErrorCode.BuildFailed
}
