import { SpruceErrors } from "#spruce/errors/errors.types"
import { SpruceErrorOptions, ErrorOptions as ISpruceErrorOptions} from "@sprucelabs/error"
import { SchemaErrorOptions } from '@sprucelabs/schema'

export interface InvalidFeatureCodeErrorOptions extends SpruceErrors.SpruceCli.InvalidFeatureCode, ISpruceErrorOptions {
	code: 'INVALID_FEATURE_CODE'
}
export interface UserNotFoundErrorOptions extends SpruceErrors.SpruceCli.UserNotFound, ISpruceErrorOptions {
	code: 'USER_NOT_FOUND'
}
export interface SchemaExistsErrorOptions extends SpruceErrors.SpruceCli.SchemaExists, ISpruceErrorOptions {
	code: 'SCHEMA_EXISTS'
}
export interface InvalidEventContractErrorOptions extends SpruceErrors.SpruceCli.InvalidEventContract, ISpruceErrorOptions {
	code: 'INVALID_EVENT_CONTRACT'
}
export interface CommandAbortedErrorOptions extends SpruceErrors.SpruceCli.CommandAborted, ISpruceErrorOptions {
	code: 'COMMAND_ABORTED'
}
export interface NotImplementedErrorOptions extends SpruceErrors.SpruceCli.NotImplemented, ISpruceErrorOptions {
	code: 'NOT_IMPLEMENTED'
}
export interface NoOrganizationsFoundErrorOptions extends SpruceErrors.SpruceCli.NoOrganizationsFound, ISpruceErrorOptions {
	code: 'NO_ORGANIZATIONS_FOUND'
}
export interface ExecutingCommandFailedErrorOptions extends SpruceErrors.SpruceCli.ExecutingCommandFailed, ISpruceErrorOptions {
	code: 'EXECUTING_COMMAND_FAILED'
}
export interface SkillNotRegisteredErrorOptions extends SpruceErrors.SpruceCli.SkillNotRegistered, ISpruceErrorOptions {
	code: 'SKILL_NOT_REGISTERED'
}
export interface VscodeNotInstalledErrorOptions extends SpruceErrors.SpruceCli.VscodeNotInstalled, ISpruceErrorOptions {
	code: 'VSCODE_NOT_INSTALLED'
}
export interface InvalidTestDirectoryErrorOptions extends SpruceErrors.SpruceCli.InvalidTestDirectory, ISpruceErrorOptions {
	code: 'INVALID_TEST_DIRECTORY'
}
export interface CommandNotImplementedErrorOptions extends SpruceErrors.SpruceCli.CommandNotImplemented, ISpruceErrorOptions {
	code: 'COMMAND_NOT_IMPLEMENTED'
}
export interface TestFailedErrorOptions extends SpruceErrors.SpruceCli.TestFailed, ISpruceErrorOptions {
	code: 'TEST_FAILED'
}
export interface LintFailedErrorOptions extends SpruceErrors.SpruceCli.LintFailed, ISpruceErrorOptions {
	code: 'LINT_FAILED'
}
export interface FileExistsErrorOptions extends SpruceErrors.SpruceCli.FileExists, ISpruceErrorOptions {
	code: 'FILE_EXISTS'
}
export interface DirectoryEmptyErrorOptions extends SpruceErrors.SpruceCli.DirectoryEmpty, ISpruceErrorOptions {
	code: 'DIRECTORY_EMPTY'
}
export interface CreateAutoloaderFailedErrorOptions extends SpruceErrors.SpruceCli.CreateAutoloaderFailed, ISpruceErrorOptions {
	code: 'CREATE_AUTOLOADER_FAILED'
}
export interface MercuryResponseErrorErrorOptions extends SpruceErrors.SpruceCli.MercuryResponseError, ISpruceErrorOptions {
	code: 'MERCURY_RESPONSE_ERROR'
}
export interface DirectoryNotSkillErrorOptions extends SpruceErrors.SpruceCli.DirectoryNotSkill, ISpruceErrorOptions {
	code: 'DIRECTORY_NOT_SKILL'
}
export interface GenericErrorOptions extends SpruceErrors.SpruceCli.Generic, ISpruceErrorOptions {
	code: 'GENERIC'
}
export interface DeployFailedErrorOptions extends SpruceErrors.SpruceCli.DeployFailed, ISpruceErrorOptions {
	code: 'DEPLOY_FAILED'
}
export interface InvalidCommandErrorOptions extends SpruceErrors.SpruceCli.InvalidCommand, ISpruceErrorOptions {
	code: 'INVALID_COMMAND'
}
export interface SchemaFailedToImportErrorOptions extends SpruceErrors.SpruceCli.SchemaFailedToImport, ISpruceErrorOptions {
	code: 'SCHEMA_FAILED_TO_IMPORT'
}
export interface FeatureNotInstalledErrorOptions extends SpruceErrors.SpruceCli.FeatureNotInstalled, ISpruceErrorOptions {
	code: 'FEATURE_NOT_INSTALLED'
}
export interface BuildFailedErrorOptions extends SpruceErrors.SpruceCli.BuildFailed, ISpruceErrorOptions {
	code: 'BUILD_FAILED'
}
export interface FailedToImportErrorOptions extends SpruceErrors.SpruceCli.FailedToImport, ISpruceErrorOptions {
	code: 'FAILED_TO_IMPORT'
}
export interface BootErrorErrorOptions extends SpruceErrors.SpruceCli.BootError, ISpruceErrorOptions {
	code: 'BOOT_ERROR'
}

type ErrorOptions = SchemaErrorOptions | SpruceErrorOptions | InvalidFeatureCodeErrorOptions  | UserNotFoundErrorOptions  | SchemaExistsErrorOptions  | InvalidEventContractErrorOptions  | CommandAbortedErrorOptions  | NotImplementedErrorOptions  | NoOrganizationsFoundErrorOptions  | ExecutingCommandFailedErrorOptions  | SkillNotRegisteredErrorOptions  | VscodeNotInstalledErrorOptions  | InvalidTestDirectoryErrorOptions  | CommandNotImplementedErrorOptions  | TestFailedErrorOptions  | LintFailedErrorOptions  | FileExistsErrorOptions  | DirectoryEmptyErrorOptions  | CreateAutoloaderFailedErrorOptions  | MercuryResponseErrorErrorOptions  | DirectoryNotSkillErrorOptions  | GenericErrorOptions  | DeployFailedErrorOptions  | InvalidCommandErrorOptions  | SchemaFailedToImportErrorOptions  | FeatureNotInstalledErrorOptions  | BuildFailedErrorOptions  | FailedToImportErrorOptions  | BootErrorErrorOptions 

export default ErrorOptions
