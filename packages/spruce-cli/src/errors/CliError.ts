import { SpruceError } from '@sprucelabs/error'
import { CliErrorCode, CliErrorOptions } from './types'

export default class CliError extends SpruceError<CliErrorOptions> {
	public friendlyMessage(): string {
		const { options } = this
		let message

		switch (options?.code) {
			// invalid command
			case CliErrorCode.InvalidCommand:
				message = `Invalid command: ${options.args.join(' ')}\n`
				message += `Try running spruce --help`
				break
			case CliErrorCode.CouldNotLoadCommand:
				message = `Failed to load command at ${options.file}!\n`
				message += 'This is likely a syntax or lint error.'
				break

			case CliErrorCode.GenericMercury:
				console.log('finish')
				debugger
				message = super.friendlyMessage()
				break
			case CliErrorCode.Generic:
			default:
				message = super.friendlyMessage()
		}
		return message
	}
}
