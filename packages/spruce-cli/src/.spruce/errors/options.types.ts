import { SpruceErrors } from "#spruce/errors/errors.types"
import { SpruceErrorOptions, ISpruceErrorOptions} from "@sprucelabs/error"
import { SchemaErrorOptions } from '@sprucelabs/schema'

export interface IBootFailedErrorOptions extends SpruceErrors.SpruceCli.IBootFailed, ISpruceErrorOptions {
	code: 'BOOT_FAILED'
}
export interface IBuildFailedErrorOptions extends SpruceErrors.SpruceCli.IBuildFailed, ISpruceErrorOptions {
	code: 'BUILD_FAILED'
}
export interface ICommandAbortedErrorOptions extends SpruceErrors.SpruceCli.ICommandAborted, ISpruceErrorOptions {
	code: 'COMMAND_ABORTED'
}
export interface ICommandNotImplementedErrorOptions extends SpruceErrors.SpruceCli.ICommandNotImplemented, ISpruceErrorOptions {
	code: 'COMMAND_NOT_IMPLEMENTED'
}
export interface ICreateAutoloaderFailedErrorOptions extends SpruceErrors.SpruceCli.ICreateAutoloaderFailed, ISpruceErrorOptions {
	code: 'CREATE_AUTOLOADER_FAILED'
}
export interface IDirectoryEmptyErrorOptions extends SpruceErrors.SpruceCli.IDirectoryEmpty, ISpruceErrorOptions {
	code: 'DIRECTORY_EMPTY'
}
export interface IExecutingCommandFailedErrorOptions extends SpruceErrors.SpruceCli.IExecutingCommandFailed, ISpruceErrorOptions {
	code: 'EXECUTING_COMMAND_FAILED'
}
export interface IFailedToImportErrorOptions extends SpruceErrors.SpruceCli.IFailedToImport, ISpruceErrorOptions {
	code: 'FAILED_TO_IMPORT'
}
export interface IFileExistsErrorOptions extends SpruceErrors.SpruceCli.IFileExists, ISpruceErrorOptions {
	code: 'FILE_EXISTS'
}
export interface IGenericErrorOptions extends SpruceErrors.SpruceCli.IGeneric, ISpruceErrorOptions {
	code: 'GENERIC'
}
export interface IGenericMercuryErrorOptions extends SpruceErrors.SpruceCli.IGenericMercury, ISpruceErrorOptions {
	code: 'GENERIC_MERCURY'
}
export interface IInvalidCommandErrorOptions extends SpruceErrors.SpruceCli.IInvalidCommand, ISpruceErrorOptions {
	code: 'INVALID_COMMAND'
}
export interface IInvalidFeatureCodeErrorOptions extends SpruceErrors.SpruceCli.IInvalidFeatureCode, ISpruceErrorOptions {
	code: 'INVALID_FEATURE_CODE'
}
export interface ILintFailedErrorOptions extends SpruceErrors.SpruceCli.ILintFailed, ISpruceErrorOptions {
	code: 'LINT_FAILED'
}
export interface INotImplementedErrorOptions extends SpruceErrors.SpruceCli.INotImplemented, ISpruceErrorOptions {
	code: 'NOT_IMPLEMENTED'
}
export interface ISchemaExistsErrorOptions extends SpruceErrors.SpruceCli.ISchemaExists, ISpruceErrorOptions {
	code: 'SCHEMA_EXISTS'
}
export interface ISchemaFailedToImportErrorOptions extends SpruceErrors.SpruceCli.ISchemaFailedToImport, ISpruceErrorOptions {
	code: 'SCHEMA_FAILED_TO_IMPORT'
}
export interface ITestFailedErrorOptions extends SpruceErrors.SpruceCli.ITestFailed, ISpruceErrorOptions {
	code: 'TEST_FAILED'
}
export interface IUserNotFoundErrorOptions extends SpruceErrors.SpruceCli.IUserNotFound, ISpruceErrorOptions {
	code: 'USER_NOT_FOUND'
}
export interface IVscodeNotInstalledErrorOptions extends SpruceErrors.SpruceCli.IVscodeNotInstalled, ISpruceErrorOptions {
	code: 'VSCODE_NOT_INSTALLED'
}
export interface IFeatureNotInstalledErrorOptions extends SpruceErrors.SpruceCli.IFeatureNotInstalled, ISpruceErrorOptions {
	code: 'FEATURE_NOT_INSTALLED'
}

type ErrorOptions = SchemaErrorOptions | SpruceErrorOptions | IBootFailedErrorOptions  | IBuildFailedErrorOptions  | ICommandAbortedErrorOptions  | ICommandNotImplementedErrorOptions  | ICreateAutoloaderFailedErrorOptions  | IDirectoryEmptyErrorOptions  | IExecutingCommandFailedErrorOptions  | IFailedToImportErrorOptions  | IFileExistsErrorOptions  | IGenericErrorOptions  | IGenericMercuryErrorOptions  | IInvalidCommandErrorOptions  | IInvalidFeatureCodeErrorOptions  | ILintFailedErrorOptions  | INotImplementedErrorOptions  | ISchemaExistsErrorOptions  | ISchemaFailedToImportErrorOptions  | ITestFailedErrorOptions  | IUserNotFoundErrorOptions  | IVscodeNotInstalledErrorOptions  | IFeatureNotInstalledErrorOptions 

export default ErrorOptions
