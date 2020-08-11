import pathUtil from 'path'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import fs from 'fs-extra'
import md5 from 'md5'
import SpruceError from '../errors/SpruceError'
import CommandService from './CommandService'

export default class ImportService extends CommandService {
	private divider = '## SPRUCE-CLI DIVIDER ##'
	private errorDivider = '## SPRUCE-CLI ERROR DIVIDER ##'

	private static cachedImports: Record<string, Record<string, any>> = {}

	public importAll = async <T extends Record<string, any>>(
		file: string
	): Promise<T> => {
		const { hash, fileContents } = this.pullHashAndContents(file)

		if (!this.hasFileChanged(hash)) {
			const isDirty = this.extractChangedImports(file, fileContents).length > 0
			if (!isDirty && ImportService.cachedImports[hash]) {
				return ImportService.cachedImports[hash] as T
			} else if (!isDirty) {
				ImportService.cachedImports[hash] = this.importAllCached(file)
				return ImportService.cachedImports[hash] as T
			}
		}

		ImportService.cachedImports[hash] = this.importAllUncached(file)
		return ImportService.cachedImports[hash].then((response: T) => {
			this.writeCacheFile(hash, response)
			return response
		})
	}

	private extractChangedImports(
		originalFilepath: string,
		contents: string
	): { hash: string; fileContents: string }[] {
		const changed: { hash: string; fileContents: string }[] = []
		let importMatches
		const regex =
			originalFilepath.search(/\.js$/i) > -1
				? /require\(['"](.*?)['"]\)/gis
				: /import.*["'](.*?)["']/gis
		while ((importMatches = regex.exec(contents)) !== null) {
			const match = importMatches[1]
			const dir = pathUtil.dirname(originalFilepath)
			const ext = pathUtil.extname(originalFilepath)
			const resolved = pathUtil.join(dir, `${match}${ext}`)
			const { hash, fileContents } = this.pullHashAndContents(resolved)

			if (this.hasFileChanged(hash)) {
				changed.push({ hash, fileContents })
			}
		}

		return changed
	}

	private writeCacheFile(hash: string, contents: Record<string, any>) {
		const destination = this.resolveCacheFile(hash)
		diskUtil.writeFile(destination, JSON.stringify(contents))
	}

	private importAllCached(file: string) {
		const { hash } = this.pullHashAndContents(file)
		const cacheFile = this.resolveCacheFile(hash)
		const contents = diskUtil.readFile(cacheFile)
		return JSON.parse(contents)
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

		let args = [
			'-e',
			`"try { const imported = require('${file}');console.log('${this.divider}');console.log(JSON.stringify(imported)); } catch(err) { console.log('${this.errorDivider}');console.log(err.options ? err.toString() : err.stack); }"`,
		]

		if (file.search(/\.ts$/i) > -1) {
			args = [
				'-r',
				'ts-node/register',
				'-r',
				'tsconfig-paths/register',
				...args,
			]
		}

		try {
			const { stdout } = await this.execute('node', {
				args,
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

	public clearCache() {
		diskUtil.deleteDir(this.cacheDir())
	}

	private hasFileChanged(hash: string) {
		const resolvedFilePath = this.resolveCacheFile(hash)
		return !diskUtil.doesFileExist(resolvedFilePath)
	}

	private resolveCacheFile(hash: string) {
		return diskUtil.resolvePath(this.cacheDir(), hash + '.json')
	}

	private cacheDir(): string {
		return diskUtil.createTempDir('import-service')
	}

	private pullHashAndContents(file: string) {
		const fileContents = diskUtil.readFile(file)
		const hash = md5(fileContents)
		return { hash, fileContents }
	}
}
