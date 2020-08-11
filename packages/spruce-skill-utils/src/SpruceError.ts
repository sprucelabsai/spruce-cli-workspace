import AbstractSpruceError, { ISpruceErrorOptions } from '@sprucelabs/error'

export type ErrorOptions = {
	code: 'FAILED_TO_LOAD_PLUGIN'
	file: string
} & ISpruceErrorOptions

export default class SpruceError extends AbstractSpruceError<ErrorOptions> {
	public friendlyMessage() {
		let message = super.friendlyMessage()

		switch (this.options.code) {
			case 'FAILED_TO_LOAD_PLUGIN':
				message = `Failed to load the plugin at ${this.options.file}.\n\n`
				message += this.options.friendlyMessage
				break
		}

		return message
	}
}
