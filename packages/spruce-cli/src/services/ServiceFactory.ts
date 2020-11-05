import { Mercury } from '@sprucelabs/mercury'
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

export interface IServiceMap {
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

export type Service = keyof IServiceMap

export interface IServiceProvider {
	Service<S extends Service>(type: S, cwd?: string): IServiceMap[S]
}
export default class ServiceFactory {
	private mercury: Mercury
	private importCacheDir?: string

	public constructor(options: { mercury: Mercury; importCacheDir?: string }) {
		this.mercury = options.mercury
		this.importCacheDir = options.importCacheDir
	}

	public Service<S extends Service>(cwd: string, type: S): IServiceMap[S] {
		switch (type) {
			case 'pin':
				return new PinService(this.mercury) as IServiceMap[S]
			case 'pkg':
				return new PkgService(cwd) as IServiceMap[S]

			case 'vsCode':
				return new VsCodeService(cwd) as IServiceMap[S]
			case 'schema':
				return new SchemaService(cwd) as IServiceMap[S]
			case 'lint':
				return new LintService(cwd) as IServiceMap[S]
			case 'command': {
				return new CommandService(cwd) as IServiceMap[S]
			}
			case 'typeChecker':
				return new TypeCheckerService(cwd) as IServiceMap[S]
			case 'settings':
				return new SettingsService(cwd) as IServiceMap[S]
			case 'import':
				return new ImportService(cwd, this.importCacheDir) as IServiceMap[S]
			case 'build': {
				const commandService = new CommandService(cwd)
				return new BuildService(commandService) as IServiceMap[S]
			}
			default:
				throw new Error(`Service "${type}" not found`)
		}
	}
}
