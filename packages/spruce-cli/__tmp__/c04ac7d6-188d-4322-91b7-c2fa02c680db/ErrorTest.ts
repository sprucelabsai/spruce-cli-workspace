import BaseSpruceError from '@sprucelabs/error'
import ErrorCode from '#spruce/errors/errorCode'
import ErrorOptions from '#spruce/errors/options.types'

export default class SpruceError extends BaseSpruceError<ErrorOptions>{

    /** an easy to understand version of the errors */
    public friendlyMessage():string {

        const { options } = this
        let message
        switch (options?.code) {
            case ErrorCode.TestOne:
                message = 'A  just happened!'
                break
            case ErrorCode.TestTwo:
                message = 'A  just happened!'
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
