import BaseSpruceError from '@sprucelabs/error'
import ErrorCode from '#spruce/errors/errorCode'
import ErrorOptions from '#spruce/errors/options.types'

export default class SpruceError extends BaseSpruceError<ErrorOptions> {
	/** An easy to understand version of the errors */
	public friendlyMessage(): string {
		const { options } = this
		let message
		switch (options?.code) {
			// Invalid command
			case ErrorCode.InvalidCommand:
				message = `Invalid command: ${options.args.join(' ')}\n`
				message += `Try running spruce --help`
				break
			case ErrorCode.CouldNotLoadCommand:
				message = `Failed to load command at ${options.file}!\n`
				message += 'This is likely a syntax or lint error.'
				break

			case ErrorCode.UserNotFound:
				message = 'Could not find a user.'
				message += ` token: "${options.token}", userId: "${options.userId}"`
				break

			case ErrorCode.Generic:
				message = "When you're too lazy to make a new error"
				break
			case ErrorCode.NotImplemented:
				message = ''
				if (options.friendlyMessage) {
					message += `\n\n${options.friendlyMessage}`
				}
				break
			case ErrorCode.CommandNotImplemented:
				message = `${options.command} has not yet been implemented. ${
					options.args ? `Args: ${options.args.join(', ')}` : ''
				}`
				if (options.friendlyMessage) {
					message += `\n\n${options.friendlyMessage}`
				}

				break

			case ErrorCode.GenericMercury:
				message = `Error: Event "${options.eventName ?? 'n/a'}"${
					options.friendlyMessage
						? `: ${options.friendlyMessage}`
						: `: ${this.originalError?.message}`
				}`
				break
			case ErrorCode.TranspileFailed:
				message = 'Could not transpile (ts -> js) a script'

				break

			case ErrorCode.DefinitionFailedToImport:
				message = `Error importing "${options.file}"`
				break
			case ErrorCode.DirectoryNotFound:
				message = `Directory not found: "${options.directory}"`
				break
			case ErrorCode.BuildFailed:
				message = `Build${
					options.file ? `ing ${options.file}` : ''
				} failed. It looks like you're not running 'yarn watch'. Run it and then run 'spruce all:sync'.`

				break

			case ErrorCode.FailedToImport:
				message = `Failed to import ${options.file}`

				break

			case ErrorCode.ValueTypeServiceStageError:
				message =
					'When collecting value types for all fields, something went wrong'
				break

			case ErrorCode.ValueTypeServiceError:
				message = 'An error when generating value types for template insertion '
				break

			case ErrorCode.LintFailed:
				message = `Lint failed on pattern ${options.pattern}. Response from lint was:\n\n`
				message += options.stdout
				break

			case ErrorCode.ExecutingCommandFailed:
				if (this.originalError && this.originalError.message) {
					message = this.originalError.message + '\n\n'
				} else {
					message = ''
				}
				message += `The command that was being executed failed ${options.cmd}`
				if (options.cwd) {
					message += `\n\nCWD: ${options.cwd}`
				}
				break

			case 'COMMAND_NOT_IMPLEMENTED':
				message = 'A Command not implemented just happened!'
				break
			case 'COULD_NOT_LOAD_COMMAND':
				message = 'A Could not load command just happened!'
				break
			case 'BUILD_FAILED':
				message = 'A BuildFailed just happened!'
				break
			case 'DIRECTORY_EMPTY':
				message = 'A directoryEmpty just happened!'
				break
			case 'CREATE_AUTOLOADER_FAILED':
				message = 'A Could not create an autoloader just happened!'
				break
			case 'DIRECTORY_NOT_FOUND':
				message = 'A Directory not found just happened!'
				break
			case 'DEFINITION_FAILED_TO_IMPORT':
				message = 'A Definition failed to import just happened!'
				break
			case 'FAILED_TO_IMPORT':
				message = 'A FailedToImport just happened!'
				break
			case 'EXECUTING_COMMAND_FAILED':
				message = 'A Executing command failed just happened!'
				break
			case 'GENERIC':
				message = 'A generic just happened!'
				break
			case 'INVALID_COMMAND':
				message = 'A Invalid command just happened!'
				break
			case 'FILE_EXISTS':
				message = 'A fileExists just happened!'
				break
			case 'VALUE_TYPE_SERVICE_STAGE_ERROR':
				message = 'A Value type service stage error just happened!'
				break
			case 'PAYLOAD_ARGS':
				message = 'A Payload args just happened!'
				break
			case 'GENERIC_MERCURY':
				message = 'A Generic mercury just happened!'
				break
			case 'NOT_IMPLEMENTED':
				message = 'A Not implemented just happened!'
				break
			case 'VALUE_TYPE_SERVICE_ERROR':
				message = 'A Value type service error just happened!'
				break
			case 'LINT_FAILED':
				message = 'A Lint failed! just happened!'
				break
			case 'TRANSPILE_FAILED':
				message = 'A Transpile failed just happened!'
				break
			case 'USER_NOT_FOUND':
				message = 'A User not found just happened!'
				break
			case 'KEY_EXISTS':
				message = 'A keyExists just happened!'
				break

			default:
				message = super.friendlyMessage()
		}

		// Drop on code and friendly message
		message = `${options.code}: ${message}`
		const fullMessage = `${message}${
			options.friendlyMessage ? `\n\n${options.friendlyMessage}` : ''
		}`

		// Handle repeating text from original message by remove it
		return `${fullMessage}${
			this.originalError &&
			this.originalError.message &&
			this.originalError.message !== fullMessage
				? `\n\nOriginal error: ${this.originalError.message.replace(
						message,
						''
				  )}`
				: ''
		}`
	}
}
