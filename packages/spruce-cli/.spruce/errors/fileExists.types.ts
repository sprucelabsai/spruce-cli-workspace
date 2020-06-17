// the options for the FileExists error

import { ISpruceErrorOptions } from '@sprucelabs/error'
import { SchemaDefinitionValues } from '@sprucelabs/schema'
import fileExistsDefinition from '../../src/errors/fileExists.builder'
import ErrorCode from './errorCode'

type FileExistsDefinition = typeof fileExistsDefinition
export interface IFileExistsDefinition extends FileExistsDefinition {}

export interface IFileExistsErrorOptions
	extends SchemaDefinitionValues<IFileExistsDefinition>,
		ISpruceErrorOptions<ErrorCode> {
	/** * .FileExists - The file already exists */
	code: ErrorCode.FileExists
}
