// the options for the FileExists error

import { ISpruceErrorOptions } from '@sprucelabs/error'
import { SchemaDefinitionValues } from '@sprucelabs/schema'
import directoryNotFoundDefinition from '../../src/errors/directoryNotFound.builder'
import ErrorCode from './errorCode'

type DirectoryNotFound = typeof directoryNotFoundDefinition
export interface IDirectoryNotFound extends DirectoryNotFound {}

export interface IDirectoryNotFoundErrorOptions
	extends SchemaDefinitionValues<IDirectoryNotFound>,
		ISpruceErrorOptions<ErrorCode> {
	/** * .DirectoryNotFound - The directory was not found */
	code: ErrorCode.DirectoryNotFound
}
