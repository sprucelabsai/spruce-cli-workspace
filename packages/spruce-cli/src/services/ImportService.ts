import fs from 'fs-extra'
import md5 from 'md5'
import SpruceError from '../errors/SpruceError'
import diskUtil from '../utilities/disk.utility'
import CommandService from './CommandService'

export default class ImportService extends CommandService {
	private divider = '## SPRUCE-CLI DIVIDER ##'
	private errorDivider = '## SPRUCE-CLI ERROR DIVIDER ##'

	private static cachedImports: Record<string, Record<string, any>> = {}

	public importAll = async <T extends Record<string, any>>(
		file: string
	): Promise<T> => {
		const fileContents = diskUtil.readFile(file)
		const hash = md5(fileContents)

		if (ImportService.cachedImports[hash]) {
			return ImportService.cachedImports[hash] as T
		}

		const resolvedFilePath = diskUtil.resolvePath(
			diskUtil.createTempDir('import-service'),
			hash + '.json'
		)

		if (diskUtil.doesFileExist(resolvedFilePath)) {
			const cachedFileContents = diskUtil.readFile(resolvedFilePath)

			ImportService.cachedImports[hash] = JSON.parse(cachedFileContents)
			return ImportService.cachedImports[hash] as T
		}

		ImportService.cachedImports[hash] = this.importAllUncached(file)
		return ImportService.cachedImports[hash].then((response: T) => {
			diskUtil.writeFile(resolvedFilePath, JSON.stringify(response))
			return response
		})
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

	public importDefault = async <T extends Record<string, any>>(
		file: string
	): Promise<T> => {
		const imported: any = await this.importAll(file)
		return imported.default as T
	}
}
