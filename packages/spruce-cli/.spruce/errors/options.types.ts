// a mixin of all options for all the errors we can through
import { IBuildFailedErrorOptions } from './buildFailed.types'
import { ICreateAutoloaderFailedErrorOptions } from './createAutoloaderFailed.types'
import { IFailedToImportErrorOptions } from './failedToImport.types'
import { ICouldNotLoadCommandErrorOptions } from './couldNotLoadCommand.types'
import { IGenericErrorOptions } from './generic.types'
import { IDefinitionFailedToImportErrorOptions } from './definitionFailedToImport.types'
import { IInvalidCommandErrorOptions } from './invalidCommand.types'
import { IGenericMercuryErrorOptions } from './genericMercury.types'
import { IReservedKeywordErrorOptions } from './reservedKeyword.types'
import { ITranspileFailedErrorOptions } from './transpileFailed.types'
import { INotImplementedErrorOptions } from './notImplemented.types'
import { IValueTypeServiceErrorErrorOptions } from './valueTypeServiceError.types'
import { IUserNotFoundErrorOptions } from './userNotFound.types'
import { IValueTypeServiceStageErrorErrorOptions } from './valueTypeServiceStageError.types'
import { SpruceErrorOptions } from '@sprucelabs/error'
import { SchemaErrorOptions } from '@sprucelabs/schema'

export type ErrorOptions =
	| SchemaErrorOptions
	| SpruceErrorOptions
	| IBuildFailedErrorOptions
	| ICreateAutoloaderFailedErrorOptions
	| IFailedToImportErrorOptions
	| ICouldNotLoadCommandErrorOptions
	| IGenericErrorOptions
	| IDefinitionFailedToImportErrorOptions
	| IInvalidCommandErrorOptions
	| IGenericMercuryErrorOptions
	| IReservedKeywordErrorOptions
	| ITranspileFailedErrorOptions
	| INotImplementedErrorOptions
	| IValueTypeServiceErrorErrorOptions
	| IUserNotFoundErrorOptions
	| IValueTypeServiceStageErrorErrorOptions
