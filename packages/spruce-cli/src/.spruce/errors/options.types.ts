import { SpruceErrors } from "#spruce/errors/errors.types"
import { SpruceErrorOptions, ISpruceErrorOptions} from "@sprucelabs/error"
import { SchemaErrorOptions } from '@sprucelabs/schema'

export interface ICommandNotImplementedErrorOptions extends SpruceErrors.Local.ICommandNotImplemented, ISpruceErrorOptions {
	code: 'COMMAND_NOT_IMPLEMENTED'
}
export interface ICouldNotLoadCommandErrorOptions extends SpruceErrors.Local.ICouldNotLoadCommand, ISpruceErrorOptions {
	code: 'COULD_NOT_LOAD_COMMAND'
}
export interface IBuildFailedErrorOptions extends SpruceErrors.Local.IBuildFailed, ISpruceErrorOptions {
	code: 'BUILD_FAILED'
}
export interface IDirectoryEmptyErrorOptions extends SpruceErrors.Local.IDirectoryEmpty, ISpruceErrorOptions {
	code: 'DIRECTORY_EMPTY'
}
export interface ICreateAutoloaderFailedErrorOptions extends SpruceErrors.Local.ICreateAutoloaderFailed, ISpruceErrorOptions {
	code: 'CREATE_AUTOLOADER_FAILED'
}
export interface IDirectoryNotFoundErrorOptions extends SpruceErrors.Local.IDirectoryNotFound, ISpruceErrorOptions {
	code: 'DIRECTORY_NOT_FOUND'
}
export interface ISchemaFailedToImportErrorOptions extends SpruceErrors.Local.ISchemaFailedToImport, ISpruceErrorOptions {
	code: 'SCHEMA_FAILED_TO_IMPORT'
}
export interface IFailedToImportErrorOptions extends SpruceErrors.Local.IFailedToImport, ISpruceErrorOptions {
	code: 'FAILED_TO_IMPORT'
}
export interface IExecutingCommandFailedErrorOptions extends SpruceErrors.Local.IExecutingCommandFailed, ISpruceErrorOptions {
	code: 'EXECUTING_COMMAND_FAILED'
}
export interface IGenericErrorOptions extends SpruceErrors.Local.IGeneric, ISpruceErrorOptions {
	code: 'GENERIC'
}
export interface IInvalidCommandErrorOptions extends SpruceErrors.Local.IInvalidCommand, ISpruceErrorOptions {
	code: 'INVALID_COMMAND'
}
export interface IFileExistsErrorOptions extends SpruceErrors.Local.IFileExists, ISpruceErrorOptions {
	code: 'FILE_EXISTS'
}
export interface IValueTypeServiceStageErrorErrorOptions extends SpruceErrors.Local.IValueTypeServiceStageError, ISpruceErrorOptions {
	code: 'VALUE_TYPE_SERVICE_STAGE_ERROR'
}
export interface IPayloadArgsErrorOptions extends SpruceErrors.Local.IPayloadArgs, ISpruceErrorOptions {
	code: 'PAYLOAD_ARGS'
}
export interface IGenericMercuryErrorOptions extends SpruceErrors.Local.IGenericMercury, ISpruceErrorOptions {
	code: 'GENERIC_MERCURY'
}
export interface INotImplementedErrorOptions extends SpruceErrors.Local.INotImplemented, ISpruceErrorOptions {
	code: 'NOT_IMPLEMENTED'
}
export interface IValueTypeServiceErrorErrorOptions extends SpruceErrors.Local.IValueTypeServiceError, ISpruceErrorOptions {
	code: 'VALUE_TYPE_SERVICE_ERROR'
}
export interface ILintFailedErrorOptions extends SpruceErrors.Local.ILintFailed, ISpruceErrorOptions {
	code: 'LINT_FAILED'
}
export interface ITranspileFailedErrorOptions extends SpruceErrors.Local.ITranspileFailed, ISpruceErrorOptions {
	code: 'TRANSPILE_FAILED'
}
export interface IUserNotFoundErrorOptions extends SpruceErrors.Local.IUserNotFound, ISpruceErrorOptions {
	code: 'USER_NOT_FOUND'
}
export interface IKeyExistsErrorOptions extends SpruceErrors.Local.IKeyExists, ISpruceErrorOptions {
	code: 'KEY_EXISTS'
}

type ErrorOptions = SchemaErrorOptions | SpruceErrorOptions | ICommandNotImplementedErrorOptions  | ICouldNotLoadCommandErrorOptions  | IBuildFailedErrorOptions  | IDirectoryEmptyErrorOptions  | ICreateAutoloaderFailedErrorOptions  | IDirectoryNotFoundErrorOptions  | ISchemaFailedToImportErrorOptions  | IFailedToImportErrorOptions  | IExecutingCommandFailedErrorOptions  | IGenericErrorOptions  | IInvalidCommandErrorOptions  | IFileExistsErrorOptions  | IValueTypeServiceStageErrorErrorOptions  | IPayloadArgsErrorOptions  | IGenericMercuryErrorOptions  | INotImplementedErrorOptions  | IValueTypeServiceErrorErrorOptions  | ILintFailedErrorOptions  | ITranspileFailedErrorOptions  | IUserNotFoundErrorOptions  | IKeyExistsErrorOptions 

export default ErrorOptions
