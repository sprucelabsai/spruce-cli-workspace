import fs from 'fs-extra'
import ErrorCode from '#spruce/errors/errorCode'
import SpruceError from '../errors/SpruceError'
import log from '../singletons/log'
import CommandService from './CommandService'

export default class ImportService extends CommandService {
	private divider = '## SPRUCE-CLI DIVIDER ##'
	private errorDivider = '## SPRUCE-CLI ERROR DIVIDER ##'

	public importAll = async <T extends {}>(file: string): Promise<T> => {
		let defaultImported: T | undefined
		if (!fs.existsSync(file)) {
			throw new SpruceError({
				code: ErrorCode.FailedToImport,
				file,
				friendlyMessage: `I couldn't find the definition file`
			})
		}

		log.trace(`Import default for: ${file}`)

		try {
			const { stdout } = await this.execute('node', {
				args: [
					'-r',
					'ts-node/register',
					'-r',
					'@sprucelabs/path-resolver/register',
					'-e',
					`"try { const imported = require('${file}');console.log('${this.divider}');console.log(JSON.stringify(imported)); } catch(err) { console.log('${this.errorDivider}');console.log(err.toString()); }"`
				]
			})

			const successParts = stdout.split(this.divider)
			const errParts = stdout.split(this.errorDivider)

			if (errParts.length > 1) {
				let err: Record<string, any> = {}
				try {
					err = JSON.parse(errParts[1])
					if (!err.options) {
						throw Error('Capture and reported below')
					}
				} catch {
					err = {
						options: {
							code: ErrorCode.FailedToImport,
							file,
							friendlyMessage: `Unknown error from import, output was: "${stdout}"`
						}
					}
				}
				const proxyError = new SpruceError(err.options)
				if (err.stack) {
					proxyError.stack = err.stack
				}
				throw proxyError
			} else {
				defaultImported = JSON.parse(successParts[1])
			}
		} catch (err) {
			throw new SpruceError({
				code: ErrorCode.FailedToImport,
				file,
				originalError: err
			})
		}

		return defaultImported as T
	}

	public importDefault = async <T extends {}>(file: string): Promise<T> => {
		const imported: any = await this.importAll(file)
		return imported.default as T
	}
}
