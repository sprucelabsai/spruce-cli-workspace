import { spawn, SpawnOptions } from 'child_process'
import stringArgv from 'string-argv'
import fs from 'fs-extra'
import log from '../lib/log'
import SpruceError from '../errors/SpruceError'
import { ErrorCode } from '../../.spruce/errors/codes.types'
import AbstractUtility from './AbstractUtility'

export default class ChildUtility extends AbstractUtility {
	public async importDefault<T extends {}>(file: string): Promise<T> {
		let defaultImported: T | undefined
		if (!fs.existsSync(file)) {
			throw new SpruceError({
				code: ErrorCode.FailedToImport,
				file,
				friendlyMessage: `I couldn't find the definition file`
			})
		}

		log.debug(`Import default for: ${file}`)

		const divider = '## SPRUCE-CLI DIVIDER ##'

		try {
			const { stdout } = await this.executeCommand('node', {
				args: [
					'-r',
					'ts-node/register/transpile-only',
					'-r',
					'@sprucelabs/path-resolver/register',
					'-e',
					`"const definition = require('${file}');console.log('${divider}');console.log(JSON.stringify(definition));"`
				]
			})
			log.debug({ stdout })

			const parts = stdout.split(divider)

			defaultImported = JSON.parse(parts[1]).default
		} catch (e) {
			console.log(e)
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
