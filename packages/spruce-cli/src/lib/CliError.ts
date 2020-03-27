export default class CliError extends Error {
	public constructor(message: string, originalError: Error) {
		super(message)
		this.stack = originalError.stack
	}
}
