// the options for the FailedToImport error

import { ISpruceErrorOptions } from '@sprucelabs/error'
import { SchemaDefinitionValues } from '@sprucelabs/schema'
import failedToImportDefinition from '../../src/errors/failedToImport.builder'
import ErrorCode from './codes.types'

type FailedToImportDefinition = typeof failedToImportDefinition
export interface IFailedToImportDefinition extends FailedToImportDefinition {}

export interface IFailedToImportErrorOptions
	extends SchemaDefinitionValues<IFailedToImportDefinition>,
		ISpruceErrorOptions<ErrorCode> {
	/** * .FailedToImport - Failed to import a file through VM */
	code: ErrorCode.FailedToImport
}
