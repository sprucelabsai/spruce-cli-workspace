import BaseSpruceError from '@sprucelabs/error'
import ErrorOptions from '#spruce/errors/options.types'

export default class SpruceError extends BaseSpruceError<ErrorOptions> {
	/** An easy to understand version of the errors */
	public friendlyMessage(): string {
		const { options } = this
		let message
		switch (options?.code) {
			// Invalid command
			case 'INVALID_COMMAND':
				message = `Invalid command: ${options.args.join(' ')}\n`
				message += `Try running spruce --help`
				break
			case 'COULD_NOT_LOAD_COMMAND':
				message = `Failed to load command at ${options.file}!\n`
				message += 'This is likely a syntax or lint error.'
				break

			case 'USER_NOT_FOUND':
				message = 'Could not find a user.'
				message += ` token: "${options.token}", userId: "${options.userId}"`
				break

			case 'GENERIC':
				message = "When you're too lazy to make a new error"
				break
			case 'NOT_IMPLEMENTED':
				message = ''
				if (options.friendlyMessage) {
					message += `\n\n${options.friendlyMessage}`
				}
				break
			case 'COMMAND_NOT_IMPLEMENTED':
				message = `${options.command} has not yet been implemented. ${
					options.args ? `Args: ${options.args.join(', ')}` : ''
				}`
				if (options.friendlyMessage) {
					message += `\n\n${options.friendlyMessage}`
				}

				break

			case 'GENERIC_MERCURY':
				message = `Error: Event "${options.eventName ?? 'n/a'}"${
					options.friendlyMessage
						? `: ${options.friendlyMessage}`
						: `: ${this.originalError?.message}`
				}`
				break
			case 'TRANSPILE_FAILED':
				message = 'Could not transpile (ts -> js) a script'

				break

			case 'SCHEMA_FAILED_TO_IMPORT':
				message = `Error importing "${options.file}"`
				break
			case 'DIRECTORY_NOT_FOUND':
				message = `Directory not found: "${options.directory}"`
				break
			case 'BUILD_FAILED':
				message = `Build${
					options.file ? `ing ${options.file}` : ''
				} failed. It looks like you're not running 'yarn watch'. Run it and then run 'spruce all:sync'.`

				break

			case 'FAILED_TO_IMPORT':
				message = `Failed to import ${options.file}`

				break

			case 'VALUE_TYPE_SERVICE_STAGE_ERROR':
				message =
					'When collecting value types for all fields, something went wrong'
				break

			case 'VALUE_TYPE_SERVICE_ERROR':
				message = 'An error when generating value types for template insertion '
				break

			case 'LINT_FAILED':
				message = `Lint failed on pattern ${options.pattern}. Response from lint was:\n\n`
				message += options.stdout
				break

			case 'EXECUTING_COMMAND_FAILED':
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
