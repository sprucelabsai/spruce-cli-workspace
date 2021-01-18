import CommandService from './CommandService'
import LintService from './LintService'

export default class BuildService {
	public set cwd(cwd: string) {
		this.commandService.cwd = cwd
	}

	public get cwd() {
		return this.commandService.cwd
	}

	private activeWatch: any
	private commandService: CommandService
	private lintService: LintService

	public constructor(commandService: CommandService, lintService: LintService) {
		this.commandService = commandService
		this.lintService = lintService
	}

	public async build(options?: { shouldFixLintFirst?: boolean }) {
		if (options?.shouldFixLintFirst !== false) {
			await this.lintService.fix('**/*.ts')
		}
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
