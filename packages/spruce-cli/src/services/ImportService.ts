import fs from 'fs-extra'
import SpruceError from '../errors/SpruceError'
import diskUtil from '../utilities/disk.utility'
import CommandService from './CommandService'

export default class ImportService extends CommandService {
	private divider = '## SPRUCE-CLI DIVIDER ##'
	private errorDivider = '## SPRUCE-CLI ERROR DIVIDER ##'

	private static cachedImports: Record<
		string,
		{ hash: string; response: Record<string, any> }
	> = {}

	public importAll = async <T extends Record<string, any>>(
		file: string
	): Promise<T> => {
		const fileContents = diskUtil.readFile(file)

		if (ImportService.cachedImports[file]) {
			if (ImportService.cachedImports[file].hash === fileContents) {
				return ImportService.cachedImports[file].response as T
			}
		}

		ImportService.cachedImports[file] = {
			hash: fileContents,
			response: this.importAllUncached(file),
		}

		return ImportService.cachedImports[file].response as T
	}

	private importAllUncached = async <T extends Record<string, any>>(
		file: string
	): Promise<T> => {
		let defaultImported: T | undefined

		if (!fs.existsSync(file)) {
			throw new SpruceError({
				code: 'FAILED_TO_IMPORT',
				file,
				friendlyMessage: `I couldn't find the definition file`,
			})
		}

		try {
			const { stdout } = await this.execute('node', {
				args: [
					'-r',
					'ts-node/register',
					'-r',
					'tsconfig-paths/register',
					'-e',
					`"try { const imported = require('${file}');console.log('${this.divider}');console.log(JSON.stringify(imported)); } catch(err) { console.log('${this.errorDivider}');console.log(err.options ? err.toString() : err.stack); }"`,
				],
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
							code: 'FAILED_TO_IMPORT',
							file,
							friendlyMessage: `Unknown error from import, output was: \n\n"${
								errParts[1] ?? stdout
							}"`,
						},
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
			if (err instanceof SpruceError) {
				throw err
			} else {
				throw new SpruceError({
					code: 'FAILED_TO_IMPORT',
					file,
					originalError: err,
				})
			}
		}

		return defaultImported as T
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	public importDefault = async <T extends {}>(file: string): Promise<T> => {
		const imported: any = await this.importAll(file)
		return imported.default as T
	}
}
