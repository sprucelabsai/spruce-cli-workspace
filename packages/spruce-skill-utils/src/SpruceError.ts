import AbstractSpruceError, { ISpruceErrorOptions } from '@sprucelabs/error'

export type ErrorOptions =
	| ({
			code: 'FILE_EXISTS'
			file: string
	  } & ISpruceErrorOptions)
	| ({ code: 'FAILED_TO_LOAD_PLUGIN'; file: string } & ISpruceErrorOptions)

export default class SpruceError extends AbstractSpruceError<ErrorOptions> {
	public friendlyMessage() {
		let message = super.friendlyMessage()

		switch (this.options.code) {
			case 'FAILED_TO_LOAD_PLUGIN':
				message = `Failed to load the plugin at ${this.options.file}.\n\n`
				message += this.options.friendlyMessage
				break

			case 'FILE_EXISTS':
				message = `The file at ${this.options.file} already exists.`
				break
		}

		return message
	}
}
