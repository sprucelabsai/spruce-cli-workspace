import { SpruceErrors } from "#spruce/errors/errors.types"
import { SpruceErrorOptions, ISpruceErrorOptions} from "@sprucelabs/error"
import { SchemaErrorOptions } from '@sprucelabs/schema'

export interface BootFailedErrorOptions extends SpruceErrors.SpruceCli.BootFailed, ISpruceErrorOptions {
	code: 'BOOT_FAILED'
}
export interface BuildFailedErrorOptions extends SpruceErrors.SpruceCli.BuildFailed, ISpruceErrorOptions {
	code: 'BUILD_FAILED'
}
export interface CommandAbortedErrorOptions extends SpruceErrors.SpruceCli.CommandAborted, ISpruceErrorOptions {
	code: 'COMMAND_ABORTED'
}
export interface CommandNotImplementedErrorOptions extends SpruceErrors.SpruceCli.CommandNotImplemented, ISpruceErrorOptions {
	code: 'COMMAND_NOT_IMPLEMENTED'
}
export interface CreateAutoloaderFailedErrorOptions extends SpruceErrors.SpruceCli.CreateAutoloaderFailed, ISpruceErrorOptions {
	code: 'CREATE_AUTOLOADER_FAILED'
}
export interface DirectoryEmptyErrorOptions extends SpruceErrors.SpruceCli.DirectoryEmpty, ISpruceErrorOptions {
	code: 'DIRECTORY_EMPTY'
}
export interface ExecutingCommandFailedErrorOptions extends SpruceErrors.SpruceCli.ExecutingCommandFailed, ISpruceErrorOptions {
	code: 'EXECUTING_COMMAND_FAILED'
}
export interface FailedToImportErrorOptions extends SpruceErrors.SpruceCli.FailedToImport, ISpruceErrorOptions {
	code: 'FAILED_TO_IMPORT'
}
export interface FileExistsErrorOptions extends SpruceErrors.SpruceCli.FileExists, ISpruceErrorOptions {
	code: 'FILE_EXISTS'
}
export interface GenericErrorOptions extends SpruceErrors.SpruceCli.Generic, ISpruceErrorOptions {
	code: 'GENERIC'
}
export interface GenericMercuryErrorOptions extends SpruceErrors.SpruceCli.GenericMercury, ISpruceErrorOptions {
	code: 'GENERIC_MERCURY'
}
export interface InvalidCommandErrorOptions extends SpruceErrors.SpruceCli.InvalidCommand, ISpruceErrorOptions {
	code: 'INVALID_COMMAND'
}
export interface InvalidFeatureCodeErrorOptions extends SpruceErrors.SpruceCli.InvalidFeatureCode, ISpruceErrorOptions {
	code: 'INVALID_FEATURE_CODE'
}
export interface LintFailedErrorOptions extends SpruceErrors.SpruceCli.LintFailed, ISpruceErrorOptions {
	code: 'LINT_FAILED'
}
export interface NotImplementedErrorOptions extends SpruceErrors.SpruceCli.NotImplemented, ISpruceErrorOptions {
	code: 'NOT_IMPLEMENTED'
}
export interface SchemaExistsErrorOptions extends SpruceErrors.SpruceCli.SchemaExists, ISpruceErrorOptions {
	code: 'SCHEMA_EXISTS'
}
export interface SchemaFailedToImportErrorOptions extends SpruceErrors.SpruceCli.SchemaFailedToImport, ISpruceErrorOptions {
	code: 'SCHEMA_FAILED_TO_IMPORT'
}
export interface TestFailedErrorOptions extends SpruceErrors.SpruceCli.TestFailed, ISpruceErrorOptions {
	code: 'TEST_FAILED'
}
export interface UserNotFoundErrorOptions extends SpruceErrors.SpruceCli.UserNotFound, ISpruceErrorOptions {
	code: 'USER_NOT_FOUND'
}
export interface VscodeNotInstalledErrorOptions extends SpruceErrors.SpruceCli.VscodeNotInstalled, ISpruceErrorOptions {
	code: 'VSCODE_NOT_INSTALLED'
}
export interface FeatureNotInstalledErrorOptions extends SpruceErrors.SpruceCli.FeatureNotInstalled, ISpruceErrorOptions {
	code: 'FEATURE_NOT_INSTALLED'
}

type ErrorOptions = SchemaErrorOptions | SpruceErrorOptions | BootFailedErrorOptions  | BuildFailedErrorOptions  | CommandAbortedErrorOptions  | CommandNotImplementedErrorOptions  | CreateAutoloaderFailedErrorOptions  | DirectoryEmptyErrorOptions  | ExecutingCommandFailedErrorOptions  | FailedToImportErrorOptions  | FileExistsErrorOptions  | GenericErrorOptions  | GenericMercuryErrorOptions  | InvalidCommandErrorOptions  | InvalidFeatureCodeErrorOptions  | LintFailedErrorOptions  | NotImplementedErrorOptions  | SchemaExistsErrorOptions  | SchemaFailedToImportErrorOptions  | TestFailedErrorOptions  | UserNotFoundErrorOptions  | VscodeNotInstalledErrorOptions  | FeatureNotInstalledErrorOptions 

export default ErrorOptions
