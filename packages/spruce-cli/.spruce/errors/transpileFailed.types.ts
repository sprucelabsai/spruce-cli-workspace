// the options for the TranspileFailed error

import { ISpruceErrorOptions } from '@sprucelabs/error'
import { SchemaDefinitionValues } from '@sprucelabs/schema'
import transpileFailedDefinition from '../../src/errors/transpileFailed.builder'
import ErrorCode from './codes.types'

type TranspileFailedDefinition = typeof transpileFailedDefinition
export interface ITranspileFailedDefinition extends TranspileFailedDefinition {}

export interface ITranspileFailedErrorOptions
	extends SchemaDefinitionValues<ITranspileFailedDefinition>,
		ISpruceErrorOptions<ErrorCode> {
	/** * .TranspileFailed - Could not transpile (ts -> js) a script */
	code: ErrorCode.TranspileFailed
}
