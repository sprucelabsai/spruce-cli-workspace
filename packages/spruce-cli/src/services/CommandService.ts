import { spawn, SpawnOptions, ChildProcess } from 'child_process'
import { Writable } from 'stream'
import stringArgv from 'string-argv'
import SpruceError from '../errors/SpruceError'

export default class CommandService {
	public cwd: string
	private activeChildProcess: ChildProcess | undefined
	private ignoreCloseErrors = false

	public constructor(cwd: string) {
		this.cwd = cwd
	}

	public execute(
		cmd: string,
		options?: {
			ignoreErrors?: boolean
			args?: string[]
			stream?: boolean
			outStream?: Writable
			onData?: (data: string) => void
			spawnOptions?: SpawnOptions
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
				throw new Error('coming soon')
			}
			let stdout = ''
			let stderr = ''
			const spawnOptions: SpawnOptions = options?.stream
				? { stdio: 'inherit' }
				: {
						cwd,
						env: {
							PATH: process.env.PATH,
							FORCE_COLOR: '0',
						},
						shell: true,
						...options?.spawnOptions,
				  }

			const child = spawn(executable, args, spawnOptions)
			this.activeChildProcess = child

			if (options?.outStream) {
				child.stdout?.pipe(options.outStream)
			}

			child.stdout?.addListener('data', (data) => {
				options?.onData?.(data.toString())
				stdout += data
			})

			child.stderr?.addListener('data', (data) => {
				stderr += data
			})

			child.addListener('close', (code) => {
				child.stdout?.removeAllListeners()
				child.stderr?.removeAllListeners()
				child.removeAllListeners()

				this.activeChildProcess = undefined

				if (code === 0 || this.ignoreCloseErrors || options?.ignoreErrors) {
					resolve({ stdout })
					this.ignoreCloseErrors = false
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

	public kill = () => {
		if (this.activeChildProcess) {
			this.ignoreCloseErrors = true
			this.activeChildProcess.kill()
			this.activeChildProcess = undefined
		}
	}

	public pid = () => {
		return this.activeChildProcess?.pid
	}
}
