// the options for the FileExists error

import {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import fileExistsDefinition from '../../src/errors/fileExists.definition'
import { ISpruceErrorOptions } from '@sprucelabs/error'
import { ErrorCode } from './codes.types'

type FileExistsDefinition = typeof fileExistsDefinition
export interface IFileExistsDefinition extends FileExistsDefinition {}

export interface IFileExistsErrorOptions extends SchemaDefinitionValues<IFileExistsDefinition>, ISpruceErrorOptions<ErrorCode> {
	/** * .FileExists - The file already exists */
	code: ErrorCode.FileExists
} 

