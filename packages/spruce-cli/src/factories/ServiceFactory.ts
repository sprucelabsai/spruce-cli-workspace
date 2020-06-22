import { Mercury } from '@sprucelabs/mercury'
import CommandService from '../services/CommandService'
import ImportService from '../services/ImportService'
import LintService from '../services/LintService'
import PinService from '../services/PinService'
import PkgService from '../services/PkgService'
import SchemaService from '../services/SchemaService'
import TypeCheckerService from '../services/TypeCheckerService'
import VsCodeService from '../services/VsCodeService'

export interface IServices {
	pin: PinService
	pkg: PkgService
	vsCode: VsCodeService
	schema: SchemaService
	lint: LintService
	command: CommandService
	typeChecker: TypeCheckerService
	import: ImportService
}

export enum Service {
	Pin = 'pin',
	Pkg = 'pkg',
	VsCode = 'vsCode',
	Schema = 'schema',
	Lint = 'lint',
	Command = 'command',
	TypeChecker = 'typeChecker',
	Import = 'import'
}

export default class ServiceFactory {
	private mercury: Mercury

	public constructor(mercury: Mercury) {
		this.mercury = mercury
	}

	public Service<S extends Service>(cwd: string, type: S): IServices[S] {
		switch (type) {
			case Service.Pin:
				return new PinService(this.mercury) as IServices[S]
			case Service.Pkg:
				return new PkgService(cwd) as IServices[S]
			case Service.VsCode:
				return new VsCodeService(cwd) as IServices[S]
			case Service.Schema:
				return new SchemaService(cwd) as IServices[S]
			case Service.Lint:
				return new LintService(cwd) as IServices[S]
			case Service.Command:
				return new CommandService(cwd) as IServices[S]
			case Service.TypeChecker:
				return new TypeCheckerService(cwd) as IServices[S]
			case Service.Import:
				return new ImportService(cwd) as IServices[S]
			default:
				debugger
				throw new Error('create new error')
		}
	}
}
