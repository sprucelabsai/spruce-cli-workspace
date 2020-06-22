import { spawn, SpawnOptions } from 'child_process'
import stringArgv from 'string-argv'
import ErrorCode from '#spruce/errors/errorCode'
import SpruceError from '../errors/SpruceError'

export default class CommandService {
	public cwd: string

	public constructor(cwd: string) {
		this.cwd = cwd
	}

	public execute(
		cmd: string,
		options?: {
			args?: string[]
			/** When set to true will stream the results from the child process in real time instead of waiting to return */
			stream?: boolean
		}
	): Promise<{
		stdout: string
	}> {
		const cwd = this.cwd
		return new Promise((resolve, reject) => {
			const args = options?.args || stringArgv(cmd)
			const executable = options?.args ? cmd : args.shift()
			if (!executable) {
				throw new Error('coming sooon')
			}
			let stdout = ''
			let stderr: string | undefined
			const spawnOptions: SpawnOptions = options?.stream
				? { stdio: 'inherit' }
				: {
						cwd,
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
					reject(
						new SpruceError({
							code: ErrorCode.ExecutingCommandFailed,
							cmd: JSON.stringify({ executable, args, spawnOptions }),
							cwd,
							originalError: new Error(stderr)
						})
					)
				}
			})
		})
	}
}
