// the options for the BuildFailed error

import { SchemaDefinitionValues } from '@sprucelabs/schema'

import buildFailedDefinition from '../../src/errors/buildFailed.definition'
import { ISpruceErrorOptions } from '@sprucelabs/error'
import { ErrorCode } from './codes.types'

type BuildFailedDefinition = typeof buildFailedDefinition
export interface IBuildFailedDefinition extends BuildFailedDefinition {}

export interface IBuildFailedErrorOptions
	extends SchemaDefinitionValues<IBuildFailedDefinition>,
		ISpruceErrorOptions<ErrorCode> {
	/** * .BuildFailed - Error thrown when building or linting failed. Happens when a yarn command fails inside the package utility. */
	code: ErrorCode.BuildFailed
}
