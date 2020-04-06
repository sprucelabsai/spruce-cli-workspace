// the options for the BuildFailed error

import {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import buildFailedDefinition from '../../errors/buildFailed.definition'
import { ISpruceErrorOptions } from '@sprucelabs/error'
import { ErrorCode } from './codes.types'

type BuildFailedDefinition = typeof buildFailedDefinition
export interface IBuildFailedDefinition extends BuildFailedDefinition {}

export interface IBuildFailedErrorOptions extends SchemaDefinitionValues<IBuildFailedDefinition>, ISpruceErrorOptions<ErrorCode> {
	/** * .BuildFailed - It looks like you\'re not running `y watch`. Run it and then run `spruce all:sync`. */
	code: ErrorCode.BuildFailed
} 

