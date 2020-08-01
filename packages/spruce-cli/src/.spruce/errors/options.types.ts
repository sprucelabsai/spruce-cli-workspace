import { SpruceErrors } from "#spruce/errors/errors.types"
import { SpruceErrorOptions, ISpruceErrorOptions} from "@sprucelabs/error"
import { SchemaErrorOptions } from '@sprucelabs/schema'

export interface IBootFailedErrorOptions extends SpruceErrors.Local.IBootFailed, ISpruceErrorOptions {
	code: 'BOOT_FAILED'
}
export interface IBuildFailedErrorOptions extends SpruceErrors.Local.IBuildFailed, ISpruceErrorOptions {
	code: 'BUILD_FAILED'
}
export interface ICommandNotImplementedErrorOptions extends SpruceErrors.Local.ICommandNotImplemented, ISpruceErrorOptions {
	code: 'COMMAND_NOT_IMPLEMENTED'
}
export interface ICreateAutoloaderFailedErrorOptions extends SpruceErrors.Local.ICreateAutoloaderFailed, ISpruceErrorOptions {
	code: 'CREATE_AUTOLOADER_FAILED'
}
export interface IDirectoryEmptyErrorOptions extends SpruceErrors.Local.IDirectoryEmpty, ISpruceErrorOptions {
	code: 'DIRECTORY_EMPTY'
}
export interface IExecutingCommandFailedErrorOptions extends SpruceErrors.Local.IExecutingCommandFailed, ISpruceErrorOptions {
	code: 'EXECUTING_COMMAND_FAILED'
}
export interface IFailedToImportErrorOptions extends SpruceErrors.Local.IFailedToImport, ISpruceErrorOptions {
	code: 'FAILED_TO_IMPORT'
}
export interface IFileExistsErrorOptions extends SpruceErrors.Local.IFileExists, ISpruceErrorOptions {
	code: 'FILE_EXISTS'
}
export interface IPayloadArgsErrorOptions extends SpruceErrors.Local.IPayloadArgs, ISpruceErrorOptions {
	code: 'PAYLOAD_ARGS'
}
export interface IGenericMercuryErrorOptions extends SpruceErrors.Local.IGenericMercury, ISpruceErrorOptions {
	code: 'GENERIC_MERCURY'
}
export interface IGenericErrorOptions extends SpruceErrors.Local.IGeneric, ISpruceErrorOptions {
	code: 'GENERIC'
}
export interface IInvalidCommandErrorOptions extends SpruceErrors.Local.IInvalidCommand, ISpruceErrorOptions {
	code: 'INVALID_COMMAND'
}
export interface ILintFailedErrorOptions extends SpruceErrors.Local.ILintFailed, ISpruceErrorOptions {
	code: 'LINT_FAILED'
}
export interface INotImplementedErrorOptions extends SpruceErrors.Local.INotImplemented, ISpruceErrorOptions {
	code: 'NOT_IMPLEMENTED'
}
export interface ISchemaFailedToImportErrorOptions extends SpruceErrors.Local.ISchemaFailedToImport, ISpruceErrorOptions {
	code: 'SCHEMA_FAILED_TO_IMPORT'
}
export interface IUserNotFoundErrorOptions extends SpruceErrors.Local.IUserNotFound, ISpruceErrorOptions {
	code: 'USER_NOT_FOUND'
}

type ErrorOptions = SchemaErrorOptions | SpruceErrorOptions | IBootFailedErrorOptions  | IBuildFailedErrorOptions  | ICommandNotImplementedErrorOptions  | ICreateAutoloaderFailedErrorOptions  | IDirectoryEmptyErrorOptions  | IExecutingCommandFailedErrorOptions  | IFailedToImportErrorOptions  | IFileExistsErrorOptions  | IPayloadArgsErrorOptions  | IGenericMercuryErrorOptions  | IGenericErrorOptions  | IInvalidCommandErrorOptions  | ILintFailedErrorOptions  | INotImplementedErrorOptions  | ISchemaFailedToImportErrorOptions  | IUserNotFoundErrorOptions 

export default ErrorOptions
