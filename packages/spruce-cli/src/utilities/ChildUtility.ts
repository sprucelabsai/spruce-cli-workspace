import { spawn, SpawnOptions } from 'child_process'
import stringArgv from 'string-argv'
import fs from 'fs-extra'
import log from '../lib/log'
import SpruceError from '../errors/SpruceError'
import { ErrorCode } from '../../.spruce/errors/codes.types'
import AbstractUtility from './AbstractUtility'

export default class ChildUtility extends AbstractUtility {
	private divider = '## SPRUCE-CLI DIVIDER ##'
	private errorDivider = '## SPRUCE-CLI ERROR DIVIDER ##'

	public async importDefault<T extends {}>(file: string): Promise<T> {
		const imported: any = await this.importAll(file)
		return imported.default as T
	}

	/** Import the default export from any file */
	public async importAll<T extends {}>(file: string): Promise<T> {
		let defaultImported: T | undefined
		if (!fs.existsSync(file)) {
			throw new SpruceError({
				code: ErrorCode.FailedToImport,
				file,
				friendlyMessage: `I couldn't find the definition file`
			})
		}

		log.debug(`Import default for: ${file}`)

		try {
			const { stdout } = await this.executeCommand('node', {
				args: [
					'-r',
					'ts-node/register/transpile-only',
					'-r',
					'@sprucelabs/path-resolver/register',
					'-e',
					`"try { const imported = require('${file}');console.log('${this.divider}');console.log(JSON.stringify(imported)); } catch(err) { console.log('${this.errorDivider}');console.log(err.toString()); }"`
				]
			})
			log.debug({ stdout })

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

	/** Execute a shell command and get back the result */
	public executeCommand(
		cmd: string,
		options?: {
			/** Optionally specify the arguments instead of parsing the cmd */
			args?: string[]
			/** When set to true will stream the results from the child process in real time instead of waiting to return */
			stream?: boolean
		}
	): Promise<{
		stdout: string
	}> {
		return new Promise((resolve, reject) => {
			const args = options?.args || stringArgv(cmd)
			log.trace(`Executing command: ${cmd}`, { cwd: this.cwd, args })
			const executable = options?.args ? cmd : args.shift()
			let stdout = ''
			let stderr: string | undefined
			if (executable) {
				const spawnOptions: SpawnOptions = options?.stream
					? { stdio: 'inherit' }
					: {
							cwd: this.cwd,
							env: {
								...process.env,
								FORCE_COLOR: '1'
							},
							shell: true
					  }

				const child = spawn(executable, args, spawnOptions)
				child.stdout?.on('data', data => {
					stdout += data
				})
				child.stderr?.on('data', data => {
					stderr += data
				})
				child.on('close', code => {
					if (code === 0) {
						resolve({ stdout })
					} else {
						reject(stderr)
					}
				})
			}
		})
	}
}
