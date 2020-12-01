import BuildService from './BuildService'
import CommandService from './CommandService'
import ImportService from './ImportService'
import LintService from './LintService'
import PinService from './PinService'
import PkgService from './PkgService'
import SchemaService from './SchemaService'
import SettingsService from './SettingsService'
import TypeCheckerService from './TypeCheckerService'
import VsCodeService from './VsCodeService'

export interface ServiceMap {
	pin: PinService
	pkg: PkgService
	vsCode: VsCodeService
	schema: SchemaService
	lint: LintService
	command: CommandService
	typeChecker: TypeCheckerService
	import: ImportService
	build: BuildService
	settings: SettingsService
}

export type Service = keyof ServiceMap

export interface ServiceProvider {
	Service<S extends Service>(type: S, cwd?: string): ServiceMap[S]
}
export default class ServiceFactory {
	private importCacheDir?: string

	public constructor(options: { importCacheDir?: string }) {
		this.importCacheDir = options.importCacheDir
	}

	public Service<S extends Service>(cwd: string, type: S): ServiceMap[S] {
		switch (type) {
			case 'pin':
				return new PinService() as ServiceMap[S]
			case 'pkg':
				return new PkgService(cwd) as ServiceMap[S]

			case 'vsCode':
				return new VsCodeService(cwd) as ServiceMap[S]
			case 'schema':
				return new SchemaService(cwd) as ServiceMap[S]
			case 'lint':
				return new LintService(cwd) as ServiceMap[S]
			case 'command': {
				return new CommandService(cwd) as ServiceMap[S]
			}
			case 'typeChecker':
				return new TypeCheckerService(cwd) as ServiceMap[S]
			case 'settings':
				return new SettingsService(cwd) as ServiceMap[S]
			case 'import':
				return new ImportService(cwd, this.importCacheDir) as ServiceMap[S]
			case 'build': {
				const commandService = new CommandService(cwd)
				return new BuildService(commandService) as ServiceMap[S]
			}
			default:
				throw new Error(`Service "${type}" not found`)
		}
	}
}
