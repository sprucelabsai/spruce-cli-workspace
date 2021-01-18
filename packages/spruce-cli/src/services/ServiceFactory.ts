import { SettingsService } from '@sprucelabs/spruce-skill-utils'
import { FeatureCode } from '../features/features.types'
import SchemaService from '../features/schema/services/SchemaService'
import VsCodeService from '../features/vscode/services/VsCodeService'
import AuthService from './AuthService'
import BuildService from './BuildService'
import CommandService from './CommandService'
import EnvService from './EnvService'
import ImportService from './ImportService'
import LintService from './LintService'
import PkgService from './PkgService'
import TypeCheckerService from './TypeCheckerService'

export interface ServiceMap {
	pkg: PkgService
	vsCode: VsCodeService
	schema: SchemaService
	lint: LintService
	command: CommandService
	typeChecker: TypeCheckerService
	import: ImportService
	build: BuildService
	settings: SettingsService
	env: EnvService
	auth: AuthService
}

export type Service = keyof ServiceMap

export interface ServiceProvider {
	Service<S extends Service>(type: S, cwd?: string): ServiceMap[S]
}
export default class ServiceFactory {
	public Service<S extends Service>(cwd: string, type: S): ServiceMap[S] {
		switch (type) {
			case 'auth':
				return new AuthService(
					new SettingsService(cwd),
					new EnvService(cwd)
				) as ServiceMap[S]
			case 'pkg':
				return new PkgService(cwd) as ServiceMap[S]
			case 'env':
				return new EnvService(cwd) as ServiceMap[S]
			case 'vsCode':
				return new VsCodeService(cwd) as ServiceMap[S]
			case 'schema':
				return new SchemaService({
					cwd,
					command: new CommandService(cwd),
				}) as ServiceMap[S]
			case 'lint':
				return new LintService(cwd, new CommandService(cwd)) as ServiceMap[S]
			case 'command': {
				return new CommandService(cwd) as ServiceMap[S]
			}
			case 'typeChecker':
				return new TypeCheckerService({
					cwd,
					command: new CommandService(cwd),
				}) as ServiceMap[S]
			case 'settings':
				return new SettingsService<FeatureCode>(cwd) as ServiceMap[S]
			case 'import':
				return new ImportService({
					cwd,
					command: new CommandService(cwd),
				}) as ServiceMap[S]
			case 'build': {
				const commandService = new CommandService(cwd)
				return new BuildService(commandService) as ServiceMap[S]
			}
			default:
				throw new Error(`Service "${type}" not found`)
		}
	}
}
