import { SpruceErrors } from "#spruce/errors/errors.types"
import { SpruceErrorOptions, ISpruceErrorOptions} from "@sprucelabs/error"
import { SchemaErrorOptions } from '@sprucelabs/schema'

export interface IBootFailedErrorOptions extends SpruceErrors.SpruceCli.BootFailed, ISpruceErrorOptions {
	code: 'BOOT_FAILED'
}
export interface IBuildFailedErrorOptions extends SpruceErrors.SpruceCli.BuildFailed, ISpruceErrorOptions {
	code: 'BUILD_FAILED'
}
export interface ICommandAbortedErrorOptions extends SpruceErrors.SpruceCli.CommandAborted, ISpruceErrorOptions {
	code: 'COMMAND_ABORTED'
}
export interface ICommandNotImplementedErrorOptions extends SpruceErrors.SpruceCli.CommandNotImplemented, ISpruceErrorOptions {
	code: 'COMMAND_NOT_IMPLEMENTED'
}
export interface ICreateAutoloaderFailedErrorOptions extends SpruceErrors.SpruceCli.CreateAutoloaderFailed, ISpruceErrorOptions {
	code: 'CREATE_AUTOLOADER_FAILED'
}
export interface IDirectoryEmptyErrorOptions extends SpruceErrors.SpruceCli.DirectoryEmpty, ISpruceErrorOptions {
	code: 'DIRECTORY_EMPTY'
}
export interface IExecutingCommandFailedErrorOptions extends SpruceErrors.SpruceCli.ExecutingCommandFailed, ISpruceErrorOptions {
	code: 'EXECUTING_COMMAND_FAILED'
}
export interface IFailedToImportErrorOptions extends SpruceErrors.SpruceCli.FailedToImport, ISpruceErrorOptions {
	code: 'FAILED_TO_IMPORT'
}
export interface IFileExistsErrorOptions extends SpruceErrors.SpruceCli.FileExists, ISpruceErrorOptions {
	code: 'FILE_EXISTS'
}
export interface IGenericErrorOptions extends SpruceErrors.SpruceCli.Generic, ISpruceErrorOptions {
	code: 'GENERIC'
}
export interface IGenericMercuryErrorOptions extends SpruceErrors.SpruceCli.GenericMercury, ISpruceErrorOptions {
	code: 'GENERIC_MERCURY'
}
export interface IInvalidCommandErrorOptions extends SpruceErrors.SpruceCli.InvalidCommand, ISpruceErrorOptions {
	code: 'INVALID_COMMAND'
}
export interface IInvalidFeatureCodeErrorOptions extends SpruceErrors.SpruceCli.InvalidFeatureCode, ISpruceErrorOptions {
	code: 'INVALID_FEATURE_CODE'
}
export interface ILintFailedErrorOptions extends SpruceErrors.SpruceCli.LintFailed, ISpruceErrorOptions {
	code: 'LINT_FAILED'
}
export interface INotImplementedErrorOptions extends SpruceErrors.SpruceCli.NotImplemented, ISpruceErrorOptions {
	code: 'NOT_IMPLEMENTED'
}
export interface ISchemaExistsErrorOptions extends SpruceErrors.SpruceCli.ISchemaExists, ISpruceErrorOptions {
	code: 'SCHEMA_EXISTS'
}
export interface ISchemaFailedToImportErrorOptions extends SpruceErrors.SpruceCli.ISchemaFailedToImport, ISpruceErrorOptions {
	code: 'SCHEMA_FAILED_TO_IMPORT'
}
export interface ITestFailedErrorOptions extends SpruceErrors.SpruceCli.TestFailed, ISpruceErrorOptions {
	code: 'TEST_FAILED'
}
export interface IUserNotFoundErrorOptions extends SpruceErrors.SpruceCli.UserNotFound, ISpruceErrorOptions {
	code: 'USER_NOT_FOUND'
}
export interface IVscodeNotInstalledErrorOptions extends SpruceErrors.SpruceCli.VscodeNotInstalled, ISpruceErrorOptions {
	code: 'VSCODE_NOT_INSTALLED'
}
export interface IFeatureNotInstalledErrorOptions extends SpruceErrors.SpruceCli.FeatureNotInstalled, ISpruceErrorOptions {
	code: 'FEATURE_NOT_INSTALLED'
}

type ErrorOptions = SchemaErrorOptions | SpruceErrorOptions | IBootFailedErrorOptions  | IBuildFailedErrorOptions  | ICommandAbortedErrorOptions  | ICommandNotImplementedErrorOptions  | ICreateAutoloaderFailedErrorOptions  | IDirectoryEmptyErrorOptions  | IExecutingCommandFailedErrorOptions  | IFailedToImportErrorOptions  | IFileExistsErrorOptions  | IGenericErrorOptions  | IGenericMercuryErrorOptions  | IInvalidCommandErrorOptions  | IInvalidFeatureCodeErrorOptions  | ILintFailedErrorOptions  | INotImplementedErrorOptions  | ISchemaExistsErrorOptions  | ISchemaFailedToImportErrorOptions  | ITestFailedErrorOptions  | IUserNotFoundErrorOptions  | IVscodeNotInstalledErrorOptions  | IFeatureNotInstalledErrorOptions 

export default ErrorOptions
