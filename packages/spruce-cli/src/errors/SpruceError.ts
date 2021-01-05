import AbstractSpruceError from '@sprucelabs/error'
import upperFirst from 'lodash/upperFirst'
import ErrorOptions from '#spruce/errors/options.types'

export default class SpruceError extends AbstractSpruceError<ErrorOptions> {
	/** An easy to understand version of the errors */
	public friendlyMessage(): string {
		const { options } = this
		let message

		switch (options?.code) {
			case 'INVALID_COMMAND':
				if (options.args.length === 0) {
					message = `Hey friend 👋.`
				} else {
					message = `Invalid command: ${options.args.join(' ')}.`
				}
				message += ' Try running `spruce --help`'
				break

			case 'USER_NOT_FOUND':
				message = 'Could not find a user.'
				message += ` token: "${options.token}", userId: "${options.userId}"`
				break

			case 'GENERIC':
				message = 'Oh shoot! 🤔'
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

			case 'SCHEMA_FAILED_TO_IMPORT':
				message = `Error importing "${options.file}"`
				break

			case 'BUILD_FAILED':
				message = `Build${
					options.file ? `ing ${options.file}` : ''
				} failed. It looks like you're not running 'yarn watch'. Run it and then run 'spruce all:sync'.`

				break

			case 'FAILED_TO_IMPORT':
				message = `Failed to import ${options.file}`
				break

			case 'LINT_FAILED':
				message = `Lint failed on pattern ${options.pattern}.`
				break

			case 'EXECUTING_COMMAND_FAILED':
				if (this.originalError && this.originalError.message) {
					message = this.originalError.message + '\n\n'
				} else {
					message = ''
				}
				message += `Executing command failed '${options.cmd}'.\n\n`
				if (options.cwd) {
					message += `cwd: ${options.cwd}\n\n`
				}

				if (options.stderr) {
					message += this.cleanStdErr(options.stderr) + '\n\n'
				}

				if (options.stdout) {
					message += options.stdout
				}

				break

			case 'BOOT_FAILED':
				message = `I couldn't boot your skill!`
				break

			case 'CREATE_AUTOLOADER_FAILED':
				message = 'A Could not create an autoloader just happened!'
				break

			case 'DIRECTORY_EMPTY':
				message = 'A directory empty just happened!'
				break

			case 'FILE_EXISTS':
				message = 'A fileExists just happened!'
				break

			case 'VSCODE_NOT_INSTALLED':
				message =
					"vscode's 'code' is not installed.\n\nMac instructions: https://code.visualstudio.com/docs/setup/mac\n\nLinux instructions: https://code.visualstudio.com/docs/setup/linux\n\nWindows instructions: https://code.visualstudio.com/docs/setup/windows"
				break

			case 'SCHEMA_EXISTS':
				message = `A schema called ${options.schemaId} already exists at ${options.destination}`
				break

			case 'COMMAND_ABORTED':
				message = 'Aborted! See ya later! ✌️'
				break

			case 'INVALID_FEATURE_CODE':
				message = `Oh no! I couldn't find a feature with the code '${options.featureCode}'.`
				break

			case 'TEST_FAILED':
				message = `${options.fileName}\n - ${
					options.testName
				}\n\n${options.errorMessage
					.split('\n')
					.map((line) => `     ${line}`)
					.join('\n')}`

				break

			case 'FEATURE_NOT_INSTALLED':
				message = `\`${upperFirst(
					options.featureCode
				)}\` feature is not installed. Install it first, then try again.`
				break

			case 'MERCURY_RESPONSE_ERROR': {
				const errors = options.responseErrors
				message = `Got ${
					errors.length === 1 ? 'an error' : `${errors.length} errors`
				} from the server:\n\n`

				const errorMessages: string[] = []
				for (const err of errors) {
					errorMessages.push(err.message)
				}

				message += errorMessages.join('\n')

				break
			}
			case 'INVALID_TEST_DIRECTORY':
				message = `You are missing dependencies I need to run tests. Try \`spruce test.install\` to reinstall.`
				break

			case 'DIRECTORY_NOT_SKILL':
				message = 'The directory you are in is not a skill!'
				break

			case 'SKILL_NOT_REGISTERED':
				message = 'A skill not registered just happened!'
				break

			case 'NO_ORGANIZATIONS_FOUND':
				message = 'A no organizations found just happened!'
				break
			case 'INVALID_PARAMETERS':
				message = `The following paramater${
					options.parameters.length === 1 ? 's are' : ' is'
				} invalid:\n\n${options.parameters.join('\n')}`
				break

			default:
				message = super.friendlyMessage()
		}

		// Drop on code and friendly message
		message = `${message}`
		const fullMessage = `${message}${
			options.friendlyMessage && options.friendlyMessage !== message
				? `\n\n${options.friendlyMessage}`
				: ''
		}`

		// Handle repeating text from original message by remove it
		return `${fullMessage}${
			this.originalError &&
			this.originalError.message &&
			this.originalError.message !== message &&
			this.originalError.message !== fullMessage
				? `\n\nOriginal error: ${this.originalError.message.replace(
						message,
						''
				  )}`
				: ''
		}`
	}

	private cleanStdErr(stderr: string) {
		return stderr.replace('warning package.json: No license field', '').trim()
	}
}
