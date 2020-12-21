import CommandService from './CommandService'

export default class BuildService {
	public set cwd(cwd: string) {
		this.commandService.cwd = cwd
	}

	public get cwd() {
		return this.commandService.cwd
	}

	private activeWatch: any
	private commandService: CommandService

	public constructor(commandService: CommandService) {
		this.commandService = commandService
	}

	public async build() {
		const results = await this.commandService.execute(`yarn build`)
		return results
	}

	public async watchStart() {
		this.activeWatch = this.commandService.execute('yarn watch.build')
		return this.activeWatch
	}

	public async watchStop() {
		if (this.activeWatch) {
			this.commandService.kill()
			this.activeWatch = undefined
		}
	}
}
