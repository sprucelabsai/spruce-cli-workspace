export default class CliError extends Error {
	constructor(message: string, originalError: Error) {
		super(message)
		this.stack = originalError.stack
	}
}
