// a mixin of all options for all the errors we can through
import { SpruceErrorOptions } from '@sprucelabs/error'
import { SchemaErrorOptions } from '@sprucelabs/schema'
import { IBuildFailedErrorOptions } from './buildFailed.types'
import { ICommandNotImplementedErrorOptions } from './commandNotImplemented.types'
import { ICouldNotLoadCommandErrorOptions } from './couldNotLoadCommand.types'
import { ICreateAutoloaderFailedErrorOptions } from './createAutoloaderFailed.types'
import { IDefinitionFailedToImportErrorOptions } from './definitionFailedToImport.types'
import { IDirectoryEmptyErrorOptions } from './directoryEmpty.types'
import { IFailedToImportErrorOptions } from './failedToImport.types'
import { IFileExistsErrorOptions } from './fileExists.types'
import { IGenericErrorOptions } from './generic.types'
import { IGenericMercuryErrorOptions } from './genericMercury.types'
import { IInvalidCommandErrorOptions } from './invalidCommand.types'
import { IKeyExistsErrorOptions } from './keyExists.types'
import { ILintFailedErrorOptions } from './lintFailed.types'
import { INotImplementedErrorOptions } from './notImplemented.types'
import { IReservedKeywordErrorOptions } from './reservedKeyword.types'
import { ITranspileFailedErrorOptions } from './transpileFailed.types'
import { IUserNotFoundErrorOptions } from './userNotFound.types'
import { IValueTypeServiceErrorErrorOptions } from './valueTypeServiceError.types'
import { IValueTypeServiceStageErrorErrorOptions } from './valueTypeServiceStageError.types'

export type ErrorOptions =
	| SchemaErrorOptions
	| SpruceErrorOptions
	| IKeyExistsErrorOptions
	| ICommandNotImplementedErrorOptions
	| ICouldNotLoadCommandErrorOptions
	| ICreateAutoloaderFailedErrorOptions
	| IDefinitionFailedToImportErrorOptions
	| IDirectoryEmptyErrorOptions
	| IFailedToImportErrorOptions
	| IBuildFailedErrorOptions
	| IFileExistsErrorOptions
	| IGenericErrorOptions
	| IInvalidCommandErrorOptions
	| IGenericMercuryErrorOptions
	| ILintFailedErrorOptions
	| INotImplementedErrorOptions
	| IReservedKeywordErrorOptions
	| ITranspileFailedErrorOptions
	| IValueTypeServiceStageErrorErrorOptions
	| IValueTypeServiceErrorErrorOptions
	| IUserNotFoundErrorOptions
