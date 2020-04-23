import BaseSpruceError from '@sprucelabs/error'
import { ErrorCode } from '#spruce/errors/codes.types'
import { ErrorOptions } from '#spruce/errors/options.types'

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
				message = `${options.command} is not yet been implemented. ${
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

			case ErrorCode.BuildFailed:
				message = `Build${
					options.file ? `ing ${options.file}` : ''
				} failed. It looks like you're not running 'yarn watch'. Run it and then run 'spruce all:sync'.`

				break

			case ErrorCode.FailedToImport:
				message = `Failed to import ${options.file}`

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
			this.originalError && this.originalError.message !== fullMessage
				? `\n\nOriginal error: ${this.originalError.message.replace(
						message,
						''
				  )}`
				: ''
		}`
	}
}
