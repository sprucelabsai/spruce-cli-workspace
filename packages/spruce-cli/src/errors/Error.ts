import { default as BaseError } from '@sprucelabs/error'
import { ErrorCode } from '../.spruce/errors/codes.types'
import { ErrorOptions } from '../.spruce/errors/options.types'

export default class SpruceError extends BaseError<ErrorOptions> {
	/** an easy to understand version of the errors */
	public friendlyReason(): string {
		const { options } = this
		let message
		switch (options?.code) {
			case ErrorCode.InvalidCommand:
				message = 'this command is bad'

				break

			case ErrorCode.InvalidParams:
				message = 'taoehustnaoeh usntaoh eu'

				break

			default:
				message = super.friendlyMessage()
		}

		return message
	}
}
