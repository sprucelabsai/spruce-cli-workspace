import { spawn, SpawnOptions } from 'child_process'
import stringArgv from 'string-argv'
import ErrorCode from '#spruce/errors/errorCode'
import SpruceError from '../errors/SpruceError'

export default class CommandService {
	public cwd: string

	public constructor(cwd: string) {
		this.cwd = cwd
	}

	private static runningPromises: Promise<any>[] = []
	private static maxRunning = 5

	public async execute(
		cmd: string,
		options?: {
			args?: string[]
			/** When set to true will stream the results from the child process in real time instead of waiting to return */
			stream?: boolean
		}
	): Promise<{
		stdout: string
	}> {
		const lastInLine =
			CommandService.runningPromises[
				CommandService.runningPromises.length - CommandService.maxRunning
			]

		let resolve
		const us = new Promise((r) => {
			resolve = r
		})

		CommandService.runningPromises.push(us)

		if (lastInLine) {
			await lastInLine
		}
		const results = await this.executeUnlimited(cmd, options)
		CommandService.runningPromises = CommandService.runningPromises.filter(
			(p) => p !== us
		)

		// @ts-ignore
		resolve()

		return results
	}

	private executeUnlimited(
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
							code: ErrorCode.ExecutingCommandFailed,
							cmd: JSON.stringify({ executable, args }),
							cwd,
							originalError: new Error(stderr),
						})
					)
				}
			})
		})
	}
}
