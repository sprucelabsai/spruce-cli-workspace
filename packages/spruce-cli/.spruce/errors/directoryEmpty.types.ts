// the options for the DirectoryEmpty error

import { ISpruceErrorOptions } from '@sprucelabs/error'
import { SchemaDefinitionValues } from '@sprucelabs/schema'
import directoryEmptyDefinition from '../../src/errors/emptyDirectory.builder'
import { ErrorCode } from './codes.types'

type DirectoryEmptyDefinition = typeof directoryEmptyDefinition
export interface IDirectoryEmptyDefinition extends DirectoryEmptyDefinition {}

export interface IDirectoryEmptyErrorOptions
	extends SchemaDefinitionValues<IDirectoryEmptyDefinition>,
		ISpruceErrorOptions<ErrorCode> {
	/** * .DirectoryEmpty - The directory is empty */
	code: ErrorCode.DirectoryEmpty
}
