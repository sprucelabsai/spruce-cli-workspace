import { default as BaseError } from '@sprucelabs/error'
import { ErrorCode } from '../.spruce/errors/codes.types'
import { ErrorOptions } from '../.spruce/errors/options.types'

export default class SpruceError extends BaseError<ErrorOptions> {
	/** an easy to understand version of the errors */
	public friendlyReason(): string {
		const { options } = this
		let message
		switch (options?.code) {
			// invalid command
			case ErrorCode.InvalidCommand:
				message = `Invalid command: ${options.args.join(' ')}\n`
				message += `Try running spruce --help`
				break
			case ErrorCode.CouldNotLoadCommand:
				message = `Failed to load command at ${options.file}!\n`
				message += 'This is likely a syntax or lint error.'
				break
			case ErrorCode.GenericMercury:
				log.debug(
					`Cli Error is not handling generic mercury error yet. Consider dropping in details about the event`
				)
				message = super.friendlyMessage()
				break

			default:
				message = super.friendlyMessage()
		}

		return message
	}
}
