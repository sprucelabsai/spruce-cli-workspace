import { Mercury } from '@sprucelabs/mercury'
import BuildService from '../services/BuildService'
import CommandService from '../services/CommandService'
import ImportService from '../services/ImportService'
import LintService from '../services/LintService'
import PinService from '../services/PinService'
import PkgService from '../services/PkgService'
import SchemaService from '../services/SchemaService'
import TypeCheckerService from '../services/TypeCheckerService'
import VsCodeService from '../services/VsCodeService'

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
}

export type Service = keyof IServiceMap

export interface IServiceProvider {
	Service<S extends Service>(type: S, cwd?: string): IServiceMap[S]
}

export default class ServiceFactory {
	private mercury: Mercury

	public constructor(mercury: Mercury) {
		this.mercury = mercury
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
				const commandService = new CommandService(cwd)
				return commandService as IServiceMap[S]
			}
			case 'typeChecker':
				return new TypeCheckerService(cwd) as IServiceMap[S]
			case 'import':
				return new ImportService(cwd) as IServiceMap[S]
			case 'build': {
				const commandService = new CommandService(cwd)
				return new BuildService(commandService) as IServiceMap[S]
			}
			default:
				throw new Error(`Service "${type}" not found`)
		}
	}
}
