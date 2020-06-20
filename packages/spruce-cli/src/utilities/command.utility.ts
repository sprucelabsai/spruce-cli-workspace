import { spawn, SpawnOptions } from 'child_process'
import stringArgv from 'string-argv'

const commandUtil = {
	execute(
		cwd: string,
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
					reject(new Error(stderr))
				}
			})
		})
	}
}
export default commandUtil
