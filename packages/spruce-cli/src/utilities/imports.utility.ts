import fs from 'fs-extra'
import ErrorCode from '#spruce/errors/errorCode'
import SpruceError from '../errors/SpruceError'
import log from '../singletons/log'
import commandUtil from './command.utility'

const importsUtil = {
	divider: '## SPRUCE-CLI DIVIDER ##',
	errorDivider: '## SPRUCE-CLI ERROR DIVIDER ##',
	async importAll<T extends {}>(file: string, cwd: string): Promise<T> {
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
			const { stdout } = await commandUtil.execute(cwd, 'node', {
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
	},

	async importDefault<T extends {}>(file: string, cwd: string): Promise<T> {
		const imported: any = await this.importAll(file, cwd)
		return imported.default as T
	}
}

export default importsUtil
