import { spawn, SpawnOptions } from 'child_process'
import stringArgv from 'string-argv'
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
			// const start = new Date()
			const args = options?.args || stringArgv(cmd)
			const executable = options?.args ? cmd : args.shift()
			if (!executable) {
				// eslint-disable-next-line no-debugger
				debugger
				throw new Error('coming sooon')
			}
			let stdout = ''
			let stderr = ''
			const spawnOptions: SpawnOptions = options?.stream
				? { stdio: 'inherit' }
				: {
						cwd,
						env: {
							...process.env,
							FORCE_COLOR: '0',
						},
						shell: true,
				  }

			const child = spawn(executable, args, spawnOptions)

			child.stdout?.addListener('data', (data) => {
				stdout += data
			})

			child.stderr?.addListener('data', (data) => {
				stderr += data
			})

			child.addListener('close', (code) => {
				child.stdout?.removeAllListeners()
				child.stderr?.removeAllListeners()
				child.removeAllListeners()
				// const end = new Date()

				// console.log(
				// 	`running ${cmd} ${JSON.stringify(options?.args)} took ${end - start}`
				// )
				if (code === 0) {
					resolve({ stdout })
				} else {
					reject(
						new SpruceError({
							code: 'EXECUTING_COMMAND_FAILED',
							cmd: JSON.stringify({ executable, args }),
							cwd,
							stdout,
							stderr,
							originalError: new Error(stderr),
						})
					)
				}
			})
		})
	}
}
